import { create } from "zustand";

import Eghtesad from "./images/Eghtesad Novin.png.jpeg";
import Ayande from "./images/ayande.png.jpeg";
import BlueBank from "./images/blue.png.jpeg";
import Gardeshgari from "./images/gardeshgari.png.jpeg";
import Keshavarzi from "./images/keshavarzi.png.jpeg";
import Markazi from "./images/markazi.png.jpeg";
import Maskan from "./images/maskan1.png.jpeg";
import Melat from "./images/melat.png.jpeg";
import Pasargad from "./images/pasargad.png.jpeg";
import Persian from "./images/persian.png.jpeg";
import Refah from "./images/refah.png.jpeg";
import Saderat from "./images/saderat.png.jpeg";
import Saman from "./images/saman.png.jpeg";
import Sepah from "./images/sepah.png.jpeg";
import Tejarat from "./images/tejarat.png.jpeg";
import { History } from "../pages/PayMony";
import { NewCard } from "../pages/AddCard";

type PortalBank = {
    bankCode: { bankName: string, code: number, url: string, bg: string }[]
    bankCards: NewCard[]
    history: History[]
    bankPay: NewCard | undefined
    addBankCardHandler: (actions: NewCard) => void
    payMonyHandler: (actions: NewCard) => void
    setNewAmount: (actions: void[]) => void
    addHistoryHandler: (actions: History) => void
}

export const useportalBank = create<PortalBank>((use) => ({
    bankCode: [
        {
            bankName: "Maskan",
            code: 6280,
            url: Maskan,
            bg: "#FF9800"
        },
        {
            bankName: "Eghtesad",
            code: 6274,
            url: Eghtesad,
            bg: "#7B1FA2"
        },
        {
            bankName: "Ayande",
            code: 6362,
            url: Ayande,
            bg: "#795548"
        },
        {
            bankName: "BlueBank",
            code: 6219,
            url: BlueBank,
            bg: "#1E88E5"
        },
        {
            bankName: "Gardeshgari",
            code: 5055,
            url: Gardeshgari,
            bg: "#D32F2F"
        },
        {
            bankName: "Keshavarzi",
            code: 6392,
            url: Keshavarzi,
            bg: "#2E7D32"
        },
        {
            bankName: "Markazi",
            code: 6367,
            url: Markazi,
            bg: "#283593"
        },
        {
            bankName: "Melat",
            code: 9919,
            url: Melat,
            bg: "#B71C1C"
        },
        {
            bankName: "Pasargad",
            code: 6393,
            url: Pasargad,
            bg: "#F9A825"
        },
        {
            bankName: "Persian",
            code: 6221,
            url: Persian,
            bg: "#A1887F"
        },
        {
            bankName: "Refah",
            code: 5894,
            url: Refah,
            bg: "#5C6BC0"
        },
        {
            bankName: "Saderat",
            code: 6037,
            url: Saderat,
            bg: "#1A237E"
        },
        {
            bankName: "Saman",
            code: 8619,
            url: Saman,
            bg: "#1E88E5"
        },
        {
            bankName: "Sepah",
            code: 5892,
            url: Sepah,
            bg: "#E57373"
        },
        {
            bankName: "Tejarat",
            code: 6273,
            url: Tejarat,
            bg: "#5C6BC0"
        },
    ],
    bankCards: [],
    history: [],
    bankPay: undefined,
    addBankCardHandler: (actions) => {
        use((state) => ({ bankCards: [...state.bankCards, actions] }))
    },
    payMonyHandler: (actions) => {
        use(() => ({ bankPay: actions }))
    },
    setNewAmount: (actions) => {
        use((state) => ({
            bankCards: state.bankCards, actions
        }))
    },
    addHistoryHandler: (actions) => {
        use((state) => ({ history: [...state.history, actions] }))
    },
}))