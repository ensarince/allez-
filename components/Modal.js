import React, { Fragment, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition  } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline'
import {db, storage} from "../firebase"
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import {ref, getDownloadURL, uploadString} from "@firebase/storage"

function Modal() {
    
    const [open, setOpen] = useRecoilState(modalState)
    const filePickerRef = useRef(null)
    const climbRef = useRef(null)
    const climbGradeRef = useRef(null)
    const climbedAsRef = useRef(null)
    const climbLocation = useRef(null)
    const climbNoteRef = useRef(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)

    //usesession from next-auth, rename data to session
    const { data: session } = useSession();

    const uploadPost = async() => {
        if(loading) return

        setLoading(true)

        //1. create a post and add to firestore 'posts' collection
        //2. get the post id 
        //3. upload the image to storage
        //4. get the imgUrl and upload the final post

        const docRef = await addDoc(collection(db, 'climbs'), {
            username: session.user.name,
            climbRef: climbRef.current.value,
            climbGradeRef: climbGradeRef.current.value,
            climbedAsRef: climbedAsRef.current.value,
            climbLocation: climbLocation.current.value,
            climbNoteRef: climbNoteRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `climbs/${docRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url")
        .then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'climbs', docRef.id), {
                image: downloadURL
            })
        });

        //!saving another collection under users to get personal climb data
        const docRefUser = await addDoc(collection(db, 'users', session.user.email, 'climbs'), {
            username: session.user.name,
            climbRef: climbRef.current.value,
            climbGradeRef: climbGradeRef.current.value,
            climbedAsRef: climbedAsRef.current.value,
            climbLocation: climbLocation.current.value,
            climbNoteRef: climbNoteRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp(),
        })

        const imageRefUser = ref(storage, `users/${session.user.email}/climbs/${docRef.id}/image`);
        await uploadString(imageRefUser, selectedFile, "data_url")
        .then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRefUser);
            await updateDoc(doc(db, 'users', session.user.email, 'climbs', docRefUser.id), {
                image: downloadURL
            })
        });

        setOpen(false)
        setLoading(false)
        setSelectedFile(null)
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

  return (
    <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' 
                className="fixed z-30 inset-0 overflow-y-auto"
                onClose={setOpen}>
        <div className='flex items-end justify-center min-h-800 sm:min-h-screen pt-4 px-4 pb-20 text-center
             sm:block sm:p-0'>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    > 
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
                {/* This element trick the browser into centering the modal contents
                 Unicode Character 'ZERO WIDTH SPACE' (U+200B). */}
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>
                    &#8203;
                </span>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    enterTo='opacity-100 translate-y-0 sm:scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                    leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    > 
                    <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform
                        transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                        <div>
                            {
                                selectedFile ? (
                                    <img src={selectedFile} onClick={() => setSelectedFile} alt="" />
                                ) : (

                            <div onClick={() => filePickerRef.current.click()}
                                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer">
                                <CameraIcon 
                                    className='h-6 w-6 text-red-600'
                                    aria-hidden="true"/>
                            </div>
                                )
                            }
                            <div>
                                <div className='mt-3 text-center text-md md:text-xl sm:mt-5'>
                                    <Dialog.Title as='h2'>
                                        Post Climb
                                    </Dialog.Title>
                                    <div>
                                        <input type="file"
                                            ref={filePickerRef}
                                            hidden 
                                            onChange={addImageToPost}/>
                                    </div>
                                    <div className='mt-2'>
                                        <input className='border-none focus:ring-0 w-full text-center' 
                                            type="text"
                                            placeholder='Please enter a climb name...'
                                            ref={climbRef} />
                                             <select className='border-none focus:ring-0 w-full text-center scrollbar scrollbar-none' 
                                                ref={climbGradeRef}>
                                                <option disabled selected className='text-sm text-green3' value="5b">Please select a grade...</option>
                                                <option className='text-sm text-green3' value="five_a">five_a</option>
                                                <option className='text-sm text-green3' value="five_aplus">five_aplus</option>
                                                <option className='text-sm text-green3' value="five_b">five_b</option>
                                                <option className='text-sm text-green3' value="five_bplus">five_bplus</option>
                                                <option className='text-sm text-green3' value="five_c">five_c</option>
                                                <option className='text-sm text-green3' value="five_cplus">five_cplus</option>
                                                <option className='text-sm text-green3' value="six_a">six_a</option>
                                                <option className='text-sm text-green3' value="six_aplus">six_aplus</option>
                                                <option className='text-sm text-green3' value="six_b">six_b</option>
                                                <option className='text-sm text-green3' value="six_bplus">six_bplus</option>                
                                                <option className='text-sm text-green3' value="six_c">six_c</option>
                                                <option className='text-sm text-green3' value="six_cplus">six_cplus</option>
                                                <option className='text-sm text-green3' value="seven_a">seven_a</option>                
                                                <option className='text-sm text-green3' value="seven_aplus">seven_aplus</option>
                                                <option className='text-sm text-green3' value="seven_b">seven_b</option>
                                                <option className='text-sm text-green3' value="seven_bplus">seven_bplus</option>                
                                                <option className='text-sm text-green3' value="seven_c">seven_c</option>
                                                <option className='text-sm text-green3' value="seven_cplus">seven_cplus</option>
                                                <option className='text-sm text-green3' value="eight_a">eight_a</option>               
                                                <option className='text-sm text-green3' value="eight_aplus">eight_aplus</option>
                                                <option className='text-sm text-green3' value="eight_b">eight_b</option>
                                                <option className='text-sm text-green3' value="eight_bplus">eight_bplus</option>
                                                <option className='text-sm text-green3' value="eight_c">eight_c</option>
                                                <option className='text-sm text-green3' value="eight_cplus">eight_cplus</option>                
                                                <option className='text-sm text-green3' value="nine_a">nine_a</option>
                                                <option className='text-sm text-green3' value="nine_aplus">nine_aplus</option>
                                                <option className='text-sm text-green3' value="nine_b">nine_b</option>               
                                                <option className='text-sm text-green3' value="nine_bplus">nine_bplus</option>
                                                <option className='text-sm text-green3' value="nice_c">nice_c</option>
                                            </select>
                                            <select className='border-none focus:ring-0 w-full text-center scrollbar scrollbar-none' 
                                                ref={climbedAsRef} placeholder='Grade'>
                                                <option disabled selected className='text-sm text-green3' value="5b">In which style you climbed the route?</option>
                                                <option className='text-sm text-green3' value="5b">redpoint</option>
                                                <option className='text-sm text-green3' value="5b+">flash</option>
                                                <option className='text-sm text-green3' value="5b+">onsight</option>
                                            </select>
                                            <input className='border-none focus:ring-0 w-full text-center' 
                                            type="text"
                                            placeholder='Please enter where the climb is...'
                                            ref={climbLocation} />
                                            <textarea ref={climbNoteRef}
                                             className='border-none focus:ring-0 w-full text-center' 
                                             placeholder='Please share your thought about the climb...'/>
                                    </div>
                                </div>
                                
                            </div>
                            <div className='mt-5 sm:mt-6'>
                                <button disabled={!selectedFile} onClick={uploadPost} type='button' 
                                        className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm
                                                px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                                                focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                                                disabled:cursor-not-allowed hover:disabled:bg-gray-300'>
                                        {loading ? "Uploading..." : "Upload Post"}         
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
        </div>
        </Dialog>
    </Transition.Root>
  )
}

export default Modal