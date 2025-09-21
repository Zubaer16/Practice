import Modal from './ui/modal'
import Cart from './ui/cart'
import Image from 'next/image'

export default function Page() {
  return (
    <>
      <Modal>
        <Cart />
      </Modal>
      <Image
        src="/file.svg"
        alt="picture of the author"
        width={500}
        height={500}
      />
    </>
  )
}
