import { Fragment, useRef, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SkillModalContext } from "./AdminRows"
export default function DeleteModal() {
  const { openModal, toBeDeleted } = useContext(SkillModalContext)
  const [modal, setModal] = openModal
  const [toDelete, setToDelete] = toBeDeleted
  const cancelButtonRef = useRef(null)

  function handleDelete() {
    console.log(toDelete)
    if (toDelete[0] == 'skill') {
      const id = toDelete[1]
      const backend_url = "http://localhost:5000"
      fetch(backend_url + "/skill/delete/" + id,
        {
          method: "DELETE",
        })
        .then(response => {
          if (response.ok) {
            console.log(response.data)
            window.location.href = "/adminskillpage"
          }
          throw response;
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        })
    }

    else if (toDelete[0] == 'job') {
      const id = toDelete[1]
      const backend_url = "http://localhost:5000"
      fetch(backend_url + "/job/delete/" + id,
        {
          method: "DELETE",
        })
        .then(response => {
          if (response.ok) {
            console.log(response.data)
            window.location.href = "/adminrolepage"
          }
          throw response;
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        })
    }

    setModal({ opened: false, name: modal.name, desc: modal.desc })
  }
  function handleCancel() {
    setModal({ opened: false, name: modal.name, desc: modal.desc })
  }
  return (
    <Transition.Root show={modal.opened} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 sm:mx-0 sm:h-10 sm:w-10">
                      <svg className="h-6 w-6 text-gray-700" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" stroke-width="2" />
                        <path d="M10.5 5.5C10.5 5.77614 10.2761 6 10 6C9.72386 6 9.5 5.77614 9.5 5.5C9.5 5.22386 9.72386 5 10 5C10.2761 5 10.5 5.22386 10.5 5.5Z" fill="currentColor" stroke="currentColor" />
                        <path d="M10 15V8" stroke="currentColor" stroke-width="2" />
                      </svg>

                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-md font-medium leading-6 text-gray-700 mt-2">

                      </Dialog.Title>
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 mt-2">
                        {modal.name}
                      </Dialog.Title>

                      <div className="mt-2">
                        <p className="text-sm text-gray-700">
                          {modal.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-red-300 bg-red-300 px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-red-400 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleDelete()}
                    ref={cancelButtonRef}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => handleCancel()}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

