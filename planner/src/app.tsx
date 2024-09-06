import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from "lucide-react";
import { FormEvent, useState } from "react";

export function App() {


  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false)
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
  const [isConfirmTripModalOpen, setisConfirmTripModalOpen] = useState(false)

  const [emailToInvite, setEmailToInvite] = useState([
    'felipinhoreidelas@gmail.com'
  ]);

  function openGuestInput() {
    setIsGuestsInputOpen(true)
  }
  function closeGuestInput() {
    setIsGuestsInputOpen(false)
  }
  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }
  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  function openConfirmTripModal() {
   setisConfirmTripModalOpen(true)
  }
  function closeConfirmTripModal() {
    setisConfirmTripModalOpen(false)
  }

  function addNewInviteEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    if (emailToInvite.includes(email)) {
      return
    }

    setEmailToInvite([
      ...emailToInvite,
      email
    ])
    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const newEmailList = emailToInvite.filter(email => email !== emailToRemove)
    setEmailToInvite(newEmailList)
  }


  return (
    <div className="h-screen flex items-center justify-center">

      <div className="max-w-3xl w-full px-6 text-center space-y-11">
        <p className="text-zinc-300 text-lg ">convide seus amigos e planeje a próxima viagem!</p>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none " />
            </div>


            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>
            <div className="w-px h-6 bg-zinc-800" />


            {isGuestsInputOpen ? (
              <button onClick={closeGuestInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">alterar local/data
                <Settings2 className="size-2 text-zinc-200" />
              </button>
            )
              :
              (
                <button onClick={openGuestInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  continuar
                  <ArrowRight className="size-5 text-lime-950" />
                </button>)
            }

          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">

              <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="size-5 text-zinc-400" />
                {emailToInvite.length > 0 ? (
                  <span className="text-zinc-100 text-lg flex-1 text-left">{emailToInvite.length} pessoa(s) convidada(s)</span>
                ) : 
                (
                  <span className="text-zinc-400 text-lg flex-1 text-left">quem estará na viagem</span>
                )
              }

              </button>


              <div className="w-px h-6 bg-zinc-800" />


              <button onClick={openConfirmTripModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
              </button>

            </div>
          )}
        </div>


        <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">politica de privacidade.</a>
        </p>

      </div>

      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">selecionar convidados</h2>
                <button type="button" onClick={closeGuestsModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Os convidados irão receber emails para confirmar a participação na viagem
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {emailToInvite.map(email => {
                return (
                  <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                    <span className="text-zinc-300">{email}</span>
                    <button type="button" onClick={() => removeEmailToInvite(email)}>
                      <X className="size-4 text-zinc-400" />
                    </button>
                  </div>)
              })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <form onSubmit={addNewInviteEmail} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">

              <AtSign className="size-5 text-zinc-400" />

              <input type="email"
                name="email"
                placeholder="Digite o email do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />

              <button type="submit" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                Convidar
                <Plus
                  className="size-5 text-lime-950" />
              </button>



            </form>
          </div>
        </div>
      )}

      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Confirmar criação de viagem</h2>
                <button type="button" onClick={closeConfirmTripModal}>
                  <X className="size-5 text-zinc-400" />
                </button>
              </div>
              <p className="text-sm text-zinc-400">
                Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianopolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:
              </p>
            </div>

            <form onSubmit={addNewInviteEmail} className="space-y-3">

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input
                  name="name"
                  placeholder="Seu nome completo"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className="size-5 text-zinc-400" />
                <input type="email"
                  name="email"
                  placeholder="Seu email pessoal"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>

              <button type="submit" className="bg-lime-300 w-full justify-center text-lime-950 rounded-lg px-5 h-11          font-medium flex items-center gap-2 hover:bg-lime-400">
                Confirmar criação da viagem
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}


