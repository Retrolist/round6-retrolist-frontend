
export function OpenSourceBadge({ isOss }: { isOss?: boolean }) {
  if (typeof isOss === 'undefined') return <></>

  return (
    <div className={`${isOss ? 'text-green-800 bg-green-100' : 'text-orange-800 bg-orange-100'} rounded py-0.5 px-2`}>
      {isOss ? "Open Source" : "Closed Source"}
    </div>
  )
}