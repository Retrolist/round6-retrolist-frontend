import { Icon } from "@iconify/react/dist/iconify.js"

export default function ChainIcon({ chainId, ...rest }: { chainId: string | number, [x: string]: any }) {
  let name = ""

  switch (parseInt(chainId.toString())) {
    case 10: name = 'optimism.svg'; break;
    case 8453: name = 'base.svg'; break;
    case 34443: name = 'mode.jpg'; break;
    case 7777777: name = 'zora.jpeg'; break;
    case 252: name = 'frax.svg'; break;
  }

  if (!name) {
    return (
      <Icon
        icon="lucide:file-text"
        color="#757575"
        {...rest}
      />
    )
  }
  
  return (
    <img {...rest} src={"/img/superchain/" + name}></img>
  )
}