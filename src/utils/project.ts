
export function categoryLabel(category: string) {
  switch (category) {
    case 'COLLECTIVE_GOVERNANCE': return 'Collective Governance'
    case 'DEVELOPER_ECOSYSTEM': return 'Developer Ecosystem'
    case 'END_USER_EXPERIENCE_AND_ADOPTION': return 'End User Experience & Adoption'
    case 'OP_STACK': return 'OP Stack'
  }
}

export function ballotsColor(ballots: number): [ string, string ] {
  let bgColor = ''
  let fgColor = ''

  if (ballots < 2) {
    bgColor = '#CCCCCC' // Light Gray
    fgColor = '#000000'
  } else if (ballots < 6) {
    bgColor = '#FFCCCB' // Light Red
    fgColor = '#990000' 
  } else if (ballots < 10) {
    bgColor = '#FFD099'
    fgColor = '#CC4C10'
  } else if (ballots < 14) {
    bgColor = '#ffffe0'
    fgColor = '#ee9902'
  } else if (ballots < 17) {
    bgColor = '#E9FFC2'
    fgColor = '#82954B'
  } else {
    // bgColor = '#E9FFC2'
    // fgColor = '#379237'

    bgColor = '#BFDBFE'
    fgColor = '#1D4ED8'
  }

  return [ fgColor, bgColor ]
}