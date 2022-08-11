/**
 * contains all the constants required for the application
 */

const userType = {
    customer : 'CUSTOMER',
    engineer : 'ENGINEER',
    admin : 'ADMIN'
}

const userStatus = {
    approved : 'APPROVED',
    rejected : 'REJECTED',
    pending : 'PENDING'
}
 const ticketStatus = {
    open : 'OPEN',
    closed : 'CLOSED',
    blocked : 'BLOCKED'
 }

module.exports = {
    userType,
    userStatus,
    ticketStatus
}