import { useportalBank } from "../zustand/store"

function History() {

  const { history } = useportalBank((state)=> state)

  const showCard = history.map((card)=>{
    return (
      <div className="text-white bg-[#ffff001b] border-yellow-500 border-2 rounded-lg p-4 mb-4 flex flex-col gap-2">
        <img className="mx-auto rounded-md" src={card.imgCard} alt="" />
        <div className="flex justify-between">
          <div>Frome: {card.numberCard.match(/.{1,4}/g)?.join(' ')}</div>
          <div>To: {card.numberCardDes.match(/.{1,4}/g)?.join(' ')}</div>
        </div>
        <div className="flex justify-between">
          <div>Amount: £{card.amountDes.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
          <div>ExpiryDate: {card.payTime}</div>
        </div>
      </div>
    )
  })

  return (
    history.length !== 0 ? <div>{showCard}</div>
    : <div className="w-full h-full flex justify-center items-center text-white font-semibold text-5xl">No History</div>
  ) 
}

export default History