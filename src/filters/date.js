export default (value) => {
  const date = new Date(value)
  return date.toLocaleString({
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'})
}
