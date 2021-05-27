const globalStyles = {
    input: `flex-initial w-1/3 h-16 rounded-2xl mb-12 focus:outline-none bg-gray-200 placeholder-black text-lg sm:text-3xl
    bg-gradient-to-r from-indigo-100 via-red-400 to-yellow-400`,
    borderBottomHover: 'border-b-4 border-blue-500 border-opacity-0 hover:border-opacity-100',
    textDefault: 'text-base sm:text-2xl',
    textBig: 'text-lg sm:text-3xl',
    textXBig: 'text-4xl sm:text-6xl',
    title: 'text-4xl sm:text-6xl font-bold tracking-wider mb-20',
    button: 'py-3 px-8 rounded-3xl text-lg sm:text-3xl bg-indigo-200 hover:bg-blue-400 hover:text-white',
    dropdown: {
        div: (isVisible: boolean, horizontalPosition: string) => `flex  absolute top-9 ${horizontalPosition} z-10 bg-blue-400 
            outline-none shadow-2xl rounded-lg ${isVisible ? '' : 'hidden'}`,
        ul: 'w-max flex flex-col justify-center items-center list-none overflow-x-hidden overscroll-y-auto max-h-96 p-8',
        li: 'flex-grow p-1 rounded-lg cursor-pointer hover:bg-indigo-100',
    }
}

export default globalStyles;