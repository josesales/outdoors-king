const globalStyles = {
    pageContainer: 'w-full flex flex-col items-center',

    input: `flex-initial w-10/12 sm:w-9/12 md:w-6/12 lg:w-1/3 h-16 rounded-2xl mb-12 focus:outline-none bg-gray-200 placeholder-black 
        text-lg sm:text-3xl bg-gradient-to-r from-indigo-100 via-red-400 to-yellow-400`,

    borderBottom: 'border-b-4 border-blue-500',

    borderBottomHover: 'border-b-4 border-blue-500 border-opacity-0 hover:border-opacity-100',

    textDefault: 'text-base sm:text-2xl',

    textBig: 'text-lg sm:text-3xl',

    textXBig: 'text-4xl sm:text-6xl',

    title: 'text-4xl sm:text-6xl font-bold tracking-wider mb-20',

    button: `focus:outline-none w-40 sm:w-44  py-3 px-8 rounded-3xl text-lg sm:text-3xl bg-indigo-200 hover:bg-blue-400 
        hover:text-white`,

    cartButton: `focus:outline-none w-28 sm:w-40 py-3 rounded-3xl text-base sm:text-2xl bg-indigo-200 hover:bg-blue-400 
        hover:text-white`,

    headerDropdown: {
        div: (isVisible: boolean, horizontalPosition: string, verticalPosition?: string) => `flex  absolute 
        ${horizontalPosition} ${verticalPosition ? verticalPosition : 'top-6 sm:top-9'}
            z-40 bg-blue-400 outline-none shadow-2xl rounded-lg ${isVisible ? '' : 'hidden'}`,

        ul: 'w-max flex flex-col justify-center items-center list-none overflow-x-hidden overscroll-y-auto max-h-96 p-8',

        li: 'flex-grow p-1 rounded-lg cursor-pointer hover:bg-indigo-100',
    },

    inputDropdown: {
        div: (isVisible: boolean, horizontalPosition: string) => `flex absolute ${horizontalPosition} top-20 
            w-full z-10 outline-none shadow-2xl rounded-lg ${isVisible ? '' : 'hidden'} 
            bg-indigo-200`,

        ul: 'w-full flex flex-col justify-center items-center list-none overflow-x-hidden overscroll-y-auto max-h-96 p-8',

        li: 'flex-grow p-1 rounded-lg cursor-pointer hover:bg-indigo-100',
    },

    imageUpload: `w-28 h-28 sm:w-40 sm:h-40 rounded-2xl mb-12 focus:outline-none
        bg-gray-200 placeholder-black bg-gradient-to-r from-indigo-100 
        via-red-400 to-yellow-400 cursor-pointer`,

    checkout: {

        big: 'capitalize w-4/12 flex justify-center cursor-default',
        default: 'capitalize w-2/12 flex justify-center cursor-default',

        header: {
            container: 'w-full sm:w-11/12 md:w-9/12 flex justify-center border-b cursor-default',
        },

        content: {
            container: 'w-full sm:w-11/12 md:w-9/12 flex justify-center items-center mb-2 mt-2',
            image: 'w-full sm:w-9/12 md:w-8/12 xl:w-5/12',
        }
    },

    productDetailsContainer: 'flex flex-row flex-initial justify-start capitalize items-center bg-gradient-to-r h-16 mb-12 cursor-default rounded-2xl from-indigo-100 via-red-400 to-yellow-400 w-10/12 sm:w-9/12 md:w-6/12 lg:w-1/3',

}

export default globalStyles;