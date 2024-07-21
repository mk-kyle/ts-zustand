import { useState } from "react"
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
import { useportalBank } from "../zustand/store"


export interface NewCard {
  id: number,
  nameCard: string,
  numberCard: string,
  cvvCard: string,
  yearCard: string,
  monthCard: string,
  amountCard: string,
  backGround: string,
  imgCard: string | undefined,
}

function AddCard() {

  const [nameCard, setNameCard] = useState<string>('')
  const [numberCard, setnumberCard] = useState<string>('')
  const [cvvCard, setCvvCard] = useState<string>('')
  const [yearCard, setyearCard] = useState<string>('')
  const [monthCard, setMounthCard] = useState<string>('')
  const [amountCard, setAmountCard] = useState<string>('')
  const [backGround, setBackGround] = useState<string>('')
  const [imgCard, setImgCard] = useState<string | undefined>(undefined)

  const { bankCode } = useportalBank((statte)=> statte)
  const { addBankCardHandler } = useportalBank((state)=> state)
  const { bankCards } = useportalBank((state)=> state)
  

   function pushNotify(): void {
    new Notify({
      title: 'PLease Fill All Bxes',
      text: 'Check To Be Fill and Available Bank',
      status: 'warning'
    })
  } 
  
  console.log(bankCards);
  

  const addCardHandler = () =>{
    if (isFill) {
      addBankCardHandler(newCard)
      setNameCard('')
      setnumberCard('')
      setCvvCard('')
      setyearCard('')
      setMounthCard('')
      setAmountCard('')
      setImgCard(undefined)
      } else {
        pushNotify()     
      }
    }
 


const nameHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 65 || e.which > 90) {
      e.preventDefault()
  } 
}

const numberHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
      e.preventDefault()
  }
}

const cardNumberHandler = (e:  React.KeyboardEvent<HTMLInputElement> & React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.value.length == 0 && e.which == 48) {
      e.preventDefault()
  } else if (e.target.value.length == 0 && e.which == 96) {
      e.preventDefault()
  }
  if (e.which !== 39 && e.which !== 37 && e.which !== 8 && e.which !== 46 && e.which !== 9 && e.which < 48 || e.which < 96 && e.which > 57 || e.which > 105) {
      e.preventDefault()
  }
}


  const nameValueHandler = (e: React.ChangeEvent<HTMLInputElement>)  => {
    setNameCard(e.target.value)
  }

  const numberValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fourBankIndex: string = e.target.value[0]+e.target.value[1]+e.target.value[2]+e.target.value[3]
    const banksCode = bankCode.find((bank)=> bank.code == +fourBankIndex)

    if (banksCode) {
      bankCode.map((bank)=> {
        if (String(bank.code) == fourBankIndex) {
          setImgCard(bank.url)
          setBackGround(bank.bg)
        }
      })
    } else {
      setImgCard(undefined)
      setBackGround('')
    }
    
    setnumberCard(e.target.value)
  }

  const cvvValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvvCard(e.target.value)
  }

  const yearValueHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
    if (e.target.value == '00') {
      e.target.value = ''
  }
    setyearCard(e.target.value)
  }

  const montValueHandler = (e: React.ChangeEvent<HTMLInputElement>)=> {
    if (e.target.value == '00') {
      e.target.value = ''
  }
    setMounthCard(e.target.value)
  }

  const dateYearHandler = ( e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (+e.target.value < 10 && +e.target.value.length == 1) {
      e.target.value = 0 + e.target.value
  } else if (+e.target.value > 12) {
      e.target.value = '12'
  }
  if (+e.target.value == 0) {
      e.target.value = ''
  }
  setyearCard(e.target.value)
  }

  const dateMonthHandler = ( e: React.FocusEvent<HTMLInputElement, Element>) => {
    if (+e.target.value < 10 && +e.target.value.length == 1) {
      e.target.value = 0 + e.target.value
  } else if (+e.target.value > 12) {
      e.target.value = '12'
  }
  if (+e.target.value == 0) {
      e.target.value = ''
  }
  setMounthCard(e.target.value)
  }

  const amountValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountCard(e.target.value)
  }


  const newCard: NewCard = {
    id: Math.random() * 100,
    backGround: backGround,
    nameCard: nameCard,
    numberCard: numberCard,
    cvvCard: cvvCard,
    yearCard: yearCard,
    monthCard: monthCard,
    amountCard: amountCard,
    imgCard: imgCard
  }

  let isFill: boolean = false
   
  if (imgCard && amountCard) {
    if (nameCard.length > 2 && numberCard.length == 16 && cvvCard.length > 2 && yearCard && monthCard && amountCard.length > 3 && imgCard) {
      isFill = true
    }
  } 
  
  
  
  return (
    <div>
        <input value={nameCard} onChange={nameValueHandler} onKeyDown={nameHandler}  maxLength={20} type="text" placeholder="Card Name" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <div className="flex justify-center items-center mb-4 relative"><img className="w-8 absolute right-2 rounded-full" src={imgCard} alt="" /><input value={numberCard} onChange={numberValueHandler} onKeyDown={cardNumberHandler} maxLength={16} type="text" placeholder="Card Number" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 text-white" /></div>
        <input value={cvvCard} onChange={cvvValueHandler} onKeyDown={cardNumberHandler} maxLength={4} type="text" placeholder="Cvv2" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 mb-4 text-white text-center" />
        <div className="flex gap-4">
            <input value={yearCard} onBlur={dateYearHandler} onChange={yearValueHandler} onKeyDown={numberHandler} maxLength={2} type="text" placeholder="Year" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 mb-4 text-white text-center" /> 
            <input value={monthCard} onBlur={dateMonthHandler} onChange={montValueHandler} onKeyDown={numberHandler} maxLength={2} type="text" placeholder="Month" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2  mb-4 text-white text-center" />
         </div>
        <input value={amountCard} onChange={amountValueHandler} onKeyDown={cardNumberHandler} maxLength={10} type="text" placeholder="Amount" className="bg-[#ffff001b] w-full h-10 rounded-md outline-none border-yellow-200 border-2 pl-3 mb-4 text-white" />
        <button onClick={addCardHandler} className="w-full h-10 bg-yellow-300 rounded-md">Add Card</button>
</div>

  )
}

export default AddCard