import React from 'react'
import MedicineNav from './Mednavbar/MedicineNav.js'
import Banner from './home/Banner.js'
import Medicinedeals from './home/Medicinedeals.js'

export default function MedicineMain() {
  return (
    <>
      <MedicineNav/>
      <Banner />
      <Medicinedeals title={"Limited Time Deals"}/>
      <Medicinedeals title={"Latest Deals"}/>
      <Medicinedeals title={"Limited Time Deals"}/>
      <Medicinedeals title={"Limited Time Deals"}/>
    </>
  )
}
