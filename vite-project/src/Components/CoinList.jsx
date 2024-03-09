/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { coinData } from './coinData';
import ClipLoader from "react-spinners/ClipLoader";


const CoinList = () => {
    const defaultCoins = useRef([]);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
                const data = response.ok ? await response.json() : coinData;

                setCoins(data);
                defaultCoins.current = data;
            } catch (error) {
                console.error('error:', error);
            }
        };

         fetchData();
      
        const interval = setInterval(() => {
            fetchData();
        }, 3000); 

       

         return () => clearInterval(interval);
    }, []);

    

    const columns = [
        { field: 'market_cap_rank', headerName: '', width: 10 },
        { field: 'image', headerName: 'Coin', width: 20, renderCell: (params) => <img width={20} height={20} src={params.value} /> },
        { field: 'id', headerName: 'ID', minWidth: 70, cellClassName: 'cell-blue', checkboxSelection: true },
        { field: 'symbol', headerName: 'Symbol', width: 0 },
        { headerName: 'Buy', width: 100, renderCell: (params) => <button className='btn btn-outline-success py-0  px-2'>Buy</button> },
        { field: 'current_price', headerName: 'Price', width: 130,renderCell: (params) => <div>${params.value}</div>},
        { field: 'market_cap_change_percentage_24h', headerName: '24h', width: 130 },
        { field: 'ath_change_percentage', headerName: '7d', width: 130 },
        { field: 'price_change_24h', headerName: '24h Volume', width: 130 },
        { field: 'atl_change_percentage', headerName: 'Market Cap', width: 130 },
        { field: 'low_24h', headerName: 'low 24h', width: 100, cellClassName: 'cell-red' },
        { field: 'high_24h', headerName: 'hight 24h', width: 100 , cellClassName: 'cell-succsess' },
    ];
  
      if (coins.length === 0) {
    return (
        <div className="spinner">
            <ClipLoader color="blue" loading={true} size={35} />
        </div>
    );
}
    return (
        <div>
         
            <style jsx>
            
                {  `
                  .spinner {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .cell-red{
                  color:red;
                }
                .cell-succsess{
                  color:green;
                }
                    .cell-blue {
                        color: lightblue;
                    }
                 
               ` }
            </style>

            <h1></h1>
            <div>
            <DataGrid
        rows={coins}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 100},
          },
        }}
  
        checkboxSelection
      />
            </div>
        </div>
    );
};

export default CoinList;