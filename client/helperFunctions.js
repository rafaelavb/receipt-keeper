export function calculateExpiryDate(date, warrantyPeriod, unit) {
  const x = parseInt(warrantyPeriod)
  const purchaseDate = new Date(date)
  let expiryDate

  if (unit === 'day(s)') {
    expiryDate = new Date(purchaseDate.setDate(purchaseDate.getDate() + x))
    return expiryDate
  }

  if (unit === 'week(s)') {
    const purchaseDateInWeeks =
      new Date(date).getTime() / (1000 * 60 * 60 * 24 * 7)
    const expiryDateInWeeks = purchaseDateInWeeks + x
    const expiryDateInmSec = expiryDateInWeeks * 1000 * 60 * 60 * 24 * 7
    expiryDate = new Date(expiryDateInmSec)
    return expiryDate
  }

  if (unit === 'month(s)') {
    expiryDate = new Date(purchaseDate.setMonth(purchaseDate.getMonth() + x))
    return expiryDate
  }

  if (unit === 'year(s)') {
    expiryDate = new Date(
      purchaseDate.setFullYear(purchaseDate.getFullYear() + x)
    )
    return expiryDate
  }
}
