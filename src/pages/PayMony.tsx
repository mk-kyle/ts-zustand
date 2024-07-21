import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
import PayMonyHelper from "../utils/PayMonyHelper"
import { useportalBank } from '../zustand/store'
import { useState } from 'react'


export interface History {
  amountDes: string,
  numberCardDes: string,
  imgCard: string | undefined,
  numberCard: string  ,
  payTime: string,
}

function PayMony() {


  const { bankPay } = useportalBank((state)=> state)
  const { bankCode } = useportalBank((state)=> state)
  const { bankCards } = useportalBank((state)=> state)
  const { setNewAmount } = useportalBank((state)=> state)
  const { addHistoryHandler } = useportalBank((state)=> state)
  

  const [ desImg, setDesImg] = useState<string | undefined>(undefined)
  const [ amountDes, setAmountDes] = useState<string>('')
  const [ numberCardDes, setNumberCardDes] = useState<string>('')
  const [ password, setPassword] = useState<string>('')

  function pushNotify(): void {
    new Notify({
      title: 'PLease Fill All Bxes',
      text: 'Check To Be Fill and Available Bank',
      status: 'warning'
    })
  } 

  const now = new Date();

  const options: {timeZone: string} = { timeZone: "Asia/Tehran" };

  const formattedDate: string = now.toLocaleDateString("fa-IR", {
      ...options,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
  });


  const bankPayId: number | undefined = bankPay && bankPay.id 



  const cardNumberHandler = (e:  React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length == 0 && e.which == 48) {
        e.preventDefault()
    } else if (e.target.value.length == 0 && e.which == 96) {
        e.preventDefault()
    }
    if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
        e.preventDefault()
    }
  }
  
  

  const inpValueImgHandle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const fourBankIndex: string = e.target.value[0]+e.target.value[1]+e.target.value[2]+e.target.value[3]
    const findCode = bankCode.find((card)=> card.code == +fourBankIndex)
    setNumberCardDes(e.target.value)
    
    if (findCode) {
      bankCode.map((card)=> {
        if (+fourBankIndex == card.code) {
          setDesImg(card.url)
        }
      })
    } else setDesImg(undefined)
  }


const amountPayDesHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setAmountDes(e.target.value)
}

const passvordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value)
}


const historyPayTime = formattedDate 




let historyObj: History
if (bankPay) {
  historyObj = {
    amountDes: amountDes,
    numberCardDes: numberCardDes,
    numberCard: bankPay.numberCard,
    imgCard: bankPay.imgCard,
    payTime: historyPayTime,
  }
}


const payMonyHandler = (): void => {
  if (bankPay && bankPay.amountCard) {
    if (numberCardDes.length == 16 && desImg && password.length > 5) {
      const newCardArray = bankCards.map((card)=> {
        if (card.id == bankPayId && +card.amountCard >= +amountDes) {
          card.amountCard = String(+card.amountCard - +amountDes)
        setAmountDes('')
        setNumberCardDes('')
        setPassword('')
        setDesImg(undefined)
        addHistoryHandler(historyObj)
        } else if (card.id !== bankPayId && +card.amountCard < +amountDes) {
          pushNotify()
        }
      })
        setNewAmount(newCardArray) 
      } else{
        pushNotify()
      }
  } else{
    pushNotify()
  }
}



  return (
     bankPay ? <div>
        <input type="text" readOnly value={bankPay && bankPay.nameCard} placeholder='Card Namne' className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <div className="relative flex items-center mb-4"><img className="absolute right-2 w-8 rounded-full" src={bankPay && bankPay.imgCard} alt="" /><input type="text" readOnly value={bankPay.numberCard && bankPay.numberCard.match(/.{1,4}/g)?.join(' ')}  placeholder='Card Number'  className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
        <div className="flex items-center relative  mb-4"><img className="absolute w-8 rounded-full right-2" src={desImg} alt="" /><input type="text" value={numberCardDes} onKeyDown={cardNumberHandler} onChange={inpValueImgHandle} placeholder="Destination Card Number" maxLength={16} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
        <input type="password" value={password} onChange={passvordValueHandler} placeholder="Password" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <input type="text" value={amountDes} onKeyDown={cardNumberHandler} onChange={amountPayDesHandler}  placeholder="Destination Amount" maxLength={10} className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <button  onClick={()=>{payMonyHandler()}} className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
    </div> : <PayMonyHelper />
  )
}

export default PayMony