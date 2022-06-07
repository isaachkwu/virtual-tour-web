export const playlistDetail = [
  {
    name: 'nature',
    displayName: '校內設施',
    paronamas: [
      'ice',
      'green',
      'mountain',
      'city',
    ]
  },
  {
    name: 's',
    displayName: 'STEM教學設施',
    paronamas: [
      's1',
      's2',
      's3',
      's4',
      's5',
      's6',
      's7',
      's8', 
      's9', 
      's10', 
      's11', 
      's12', 
      's13', 
      's14', 
      's15', 
      's16',
      's17', 
      's18', 
      's19', 
      's20'
    ]
  },
  {
    name: 'a',
    displayName: '運動教學設施',
    paronamas: [
      'a1',
      'a2',
      'a3',
      'a4',
      'a5',
      'a6',
      'a7',
      'a8', 
      'a9', 
      'a10', 
      'a11', 
      'a12', 
      'a13'
    ]
  },
  {
    name: 'd',
    displayName: '音樂教學設施',
    paronamas: [
      'd1',
      'd2',
      'd3',
      'd4',
      'd5',
      'd6',
      'd7',
    ]
  },
  {
    name: 'g',
    displayName: '學校附近配套',
    paronamas: [
      'g1',
      'g2',
      'g3',
      'g4',
      'g5',
      'g6',
      'g7',
      'g8',
    ]
  },
  {
    name: 'h',
    displayName: '課外活動設備',
    paronamas: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ]
  }
]

export const nextLocationName = (currentName, list) => {
  for (const playlist of list) {
    if (playlist.paronamas.includes(currentName)) {
      const index = playlist.paronamas.indexOf(currentName)
      const length = playlist.paronamas.length
      const next = index + 1;
      if (next >= length) {
        console.warn(`last paronama in this playlist: ${currentName}`)
        return null
      }
      const result = playlist.paronamas[next]
      console.log(`result: ${result}`)
      return result
    }
  }
}

export const previousLocationName = (currentName, list) => {
  for (const playlist of list) {
    if (playlist.paronamas.includes(currentName)) {
      const index = playlist.paronamas.indexOf(currentName)
      const previous = index - 1;
      if (previous < 0) {
        console.warn(`first paronama in this playlist: ${currentName}`)
        return null
      }
      return playlist.paronamas[previous]
    }
  }
}