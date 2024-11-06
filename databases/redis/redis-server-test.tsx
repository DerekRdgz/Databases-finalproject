import React, { useEffect, useState } from 'react';
import axios from 'axios';
function BalanceComponent() {
  const [saldo, setSaldo] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const obtenerSaldo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/saldo/2');
        setSaldo(response.data.saldo);
      } catch (err) {
        setError('No se pudo obtener el saldo del Cliente');
        console.error(err);
      }
    };
    console.log(obtenerSaldo());
  }, []);
}
export default BalanceComponent;