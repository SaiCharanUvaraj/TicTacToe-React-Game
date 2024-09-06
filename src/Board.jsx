import { useEffect, useState } from 'react';

const Board = ({board,setBoard,filledSlots,setFilledSlots,turn, setTurn}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => { setWindowWidth(window.innerWidth) };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);

    const style = (windowWidth > 700) ? 'h-40 w-40 bg-none backdrop-blur-md border-4 border-white/20 rounded-2xl hover:bg-white/30 transition duration-300 flex justify-center items-center' : 'h-32 w-32 bg-none backdrop-blur-md border-4 border-white/20 rounded-2xl hover:bg-white/30 transition duration-300 flex justify-center items-center';

    const handleClick = (event) => 
    {
        if (filledSlots.length === 9) 
            return;

        const index = event.target.id;
        const found = filledSlots.includes(index);
        if (found) 
            return;
        else
        {
            const r = parseInt(index.charAt(0), 10);
            const c = parseInt(index.charAt(1), 10);
            const newBoard = board.map(row => [...row]);
            const newFilledSlots =[...filledSlots,index]
            if (turn === "X") 
            {
                newBoard[r][c] = "X";
                setTurn("O");
                localStorage.setItem("Turn",JSON.stringify("O"));
            } 
            else if (turn === "O") 
            {
                newBoard[r][c] = "O";
                setTurn("X");
                localStorage.setItem("Turn",JSON.stringify("X"));
            }
            setBoard(newBoard);
            setFilledSlots(newFilledSlots);
            localStorage.setItem('Board', JSON.stringify(newBoard));
            localStorage.setItem('FilledSlots', JSON.stringify(newFilledSlots));
        }
    };

    const pasteXO = (index) => {
        const val = board[index[0]][index[1]];
        if (val === "X") {
            return (<p className='text-9xl nerko-one-regular text-red-500 md:scale-150 scale-125'>X</p>);
        } else if (val === "O") {
            return (<p className='text-9xl nerko-one-regular text-blue-500 md:scale-150 scale-125'>O</p>);
        } else {
            return null;
        }
    };

    return (
        <div>
            <div className='grid grid-cols-3 gap-4'>
                <div className={style} id="00" onClick={handleClick}>
                    {pasteXO([0, 0])}
                </div>
                <div className={style} id="01" onClick={handleClick}>
                    {pasteXO([0, 1])}
                </div>
                <div className={style} id="02" onClick={handleClick}>
                    {pasteXO([0, 2])}
                </div>
                <div className={style} id="10" onClick={handleClick}>
                    {pasteXO([1, 0])}
                </div>
                <div className={style} id="11" onClick={handleClick}>
                    {pasteXO([1, 1])}
                </div>
                <div className={style} id="12" onClick={handleClick}>
                    {pasteXO([1, 2])}
                </div>
                <div className={style} id="20" onClick={handleClick}>
                    {pasteXO([2, 0])}
                </div>
                <div className={style} id="21" onClick={handleClick}>
                    {pasteXO([2, 1])}
                </div>
                <div className={style} id="22" onClick={handleClick}>
                    {pasteXO([2, 2])}
                </div>
            </div>
        </div>
    );
};

export default Board;
