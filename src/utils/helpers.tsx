export const thisYear = () => {
  const thisYear = new Date().getFullYear()
  return thisYear
}

export const spanWeb = () => {
  const spanWeb = thisYear() - 1998
  return spanWeb
}

export const spanBass = () => {
  const spanWeb = thisYear() - 1983
  return spanWeb
}
