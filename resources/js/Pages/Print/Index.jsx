import moment from 'moment';
import React, { useEffect } from 'react'

export default function Index(props) {
    useEffect(() => {
        window.print()
    }, [])

    return (
        <div>
            <p className='text-center'>Kode Ref : {props.transaction.meta.code}</p>
            <p className='text-center'>{moment(props.transaction.meta.date).format('LL')}</p>
            <p className='text-center'>Rp.{props.transaction.amount} - {props.transaction.type === 'deposit' ? 'debet' : 'kredit'}</p>
            <p className='text-center'>Petugas: {props.transaction.meta.collected_by}</p>
        </div>
    )
}
