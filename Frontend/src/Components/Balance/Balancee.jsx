import React from 'react'
import Balance from './Balance'

const Balancee = () => {
    return (
        <>
            <Balance
                data={[
                    { title: 'Current Balance', amount: '$9215' },
                    { title: 'Avg. Balance', amount: '$10484' },
                    { title: 'Money Spent', amount: '$256' },
                    { title: 'Money Transferred', amount: '$780' }
                ]}
            />

        </>
    )
}

export default Balancee