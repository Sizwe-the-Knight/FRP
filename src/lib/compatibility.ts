import type { Requirements } from './editorial-schema';
export type Device = { os: string; architecture: string; ram: string; storage: string; vram: string; version: string; cpu: string; gpu: string };
export const emptyDevice: Device = { os:'', architecture:'', ram:'', storage:'', vram:'', version:'', cpu:'', gpu:'' };
type Finding = { label: string; status: 'unknown'|'mismatch'|'checked'; detail: string };
export function compareRequirements(r: Requirements, device: Device): Finding[] {
  const system=r.systems?.find(s=>s.os===device.os);
  const findings: Finding[]=[{label:'Operating system',status:'unknown',detail:!device.os?'No operating system supplied.':!system?'This OS is not assessed in this article. That does not establish incompatibility.':`OS family is listed. Manually verify your version (${device.version || 'not supplied'}) against: ${system.versions}.`}];
  findings.push({label:'Architecture',status:!device.architecture || !system?.architectures?'unknown':system.architectures.includes(device.architecture as 'x64'|'arm64')?'checked':'mismatch',detail:!device.architecture || !system?.architectures?'Architecture cannot be compared with the available information.':system.architectures.includes(device.architecture as 'x64'|'arm64')?'Architecture appears in the documented list.':'Your architecture is outside the documented list for this OS; verify the project’s downloads.'});
  const numeric=(label:string,input:string,minimum:number|null)=>{
    const value=input.trim()===''?NaN:Number(input);
    findings.push({label,status:minimum===null||!Number.isFinite(value)||value<0?'unknown':value<minimum?'mismatch':'checked',detail:minimum===null?'No verified numeric requirement in this article.':!Number.isFinite(value)||value<0?'No valid amount supplied.':value<minimum?`${value} GB is below the documented ${minimum} GB for this scope.`:`${value} GB meets the documented ${minimum} GB figure only; this is not a performance guarantee.`});
  };
  numeric('RAM',device.ram,r.ramGb);numeric('Free storage',device.storage,r.storageGb);numeric('Dedicated GPU memory',device.vram,r.gpu?.minVramGb??null);
  findings.push({label:'Processor / graphics / software stack',status:'unknown',detail:'CPU capability, GPU model, shared memory, drivers, OS versions and installation dependencies need manual verification. Names typed here are notes, not automatic hardware identification.'});
  return findings;
}
