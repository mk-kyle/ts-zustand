import { useportalBank } from '../zustand/store'
import icon from './kindpng_6039982.png'

function ShowCard() {

  const { bankCards } = useportalBank((state)=>state)
  const { payMonyHandler } = useportalBank((state)=>state)

    const showCard = bankCards.map((card): JSX.Element => {
        return (
            <div onClick={()=>payMonyHandler(card)} key={`container-${card.id}`} className="flex flex-col gap-2 w-5/6 mx-auto p-3 rounded-lg mt-4 mb-4" style={{backgroundColor: card.backGround}}>
                <div key={`iconAndName-${card.id}`} className="flex justify-between items-center">
                    <img className="w-10 " src={icon} alt="" />
                    <img key={`${card.id}`} className="w-10 rounded-md" src={card.imgCard} alt="Icon Bank" />
                </div>
                    <div key={`nameContainer-${card.id}`} className="flex gap-3"><div key={`nameTexet-${card.id}`}>Name:  </div> {card.nameCard}</div>
                <div className="flex gap-3" key={`numberContainer-${card.id}`}>
                    <div key={`cardNumber${card.id}`}>Number:</div>
                    {card.numberCard.match(/.{1,4}/g)?.join(' ')}
                </div>
                <div key={`cvvcontainer-${card.id}`} className="flex gap-3"><div key={`cvvText-${card.id}`}>Cvv2:</div> {card.cvvCard}</div>
                    <div key={`dateContainer-${card.id}`} className="flex gap-3">
                       <div key={`expiryText-${card.id}`}>Expiry Date:</div>
                        <div key={`expiryContainer-${card.id}`} className="flex gap-2">
                            <div key={`year-${card.id}`}>{card.yearCard}</div>
                            <div key={`slash${card.id}`}>/</div>
                            <div key={`month${card.id}`}>{card.monthCard}</div>
                        </div>
                    </div>
                <div key={`amount${card.id}`} className="flex gap-3"><div>Amount:</div>£ {card.amountCard.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div> 
            </div>
        )
    })
    

  return (
    bankCards.length !== 0 ?
    <div>
        {showCard}
    </div>
    : <div className="flex flex-col gap-2 w-5/6 mx-auto p-3 rounded-lg mt-4 mb-4 bg-white h-56">
        <img className="w-10" src={icon} alt="" />
        <p className="text-black flex justify-center items-center font-medium text-4xl w-full h-full mb-4">No Card !</p>
    </div>
  )
}

export default ShowCard