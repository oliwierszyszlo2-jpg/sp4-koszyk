import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const produkty = [
    { id: 1, nazwa: 'Notes', cena: 12.50 },
    { id: 2, nazwa: 'Długopis', cena: 3.20 },
    { id: 3, nazwa: 'Plecak', cena: 89.00 },
    { id: 4, nazwa: 'Kalkulator', cena: 45.90 },
    { id: 5, nazwa: 'Zakreślacz', cena: 4.75 },
  ];

  const [koszyk, setKoszyk] = useState([]);

  const obliczSume = (lista) => {
    return lista.reduce((suma, item) => suma + item.cena * item.ilosc, 0);
  };

  const wypiszWKonsoli = (nowyKoszyk) => {
    const suma = obliczSume(nowyKoszyk).toFixed(2);
    console.log(`Koszyk: ${nowyKoszyk.length} pozycji; suma: ${suma}`);
  };

  const dodajDoKoszyka = (produkt) => {
    const istnieje = koszyk.find((item) => item.id === produkt.id);
    let nowyKoszyk;

    if (istnieje) {
      nowyKoszyk = koszyk.map((item) =>
        item.id === produkt.id ? { ...item, ilosc: item.ilosc + 1 } : item
      );
    } else {
      nowyKoszyk = [...koszyk, { ...produkt, ilosc: 1 }];
    }

    setKoszyk(nowyKoszyk);
    wypiszWKonsoli(nowyKoszyk);
  };

  const usunZKoszyka = (id) => {
    const nowyKoszyk = koszyk.filter((item) => item.id !== id);
    setKoszyk(nowyKoszyk);
    wypiszWKonsoli(nowyKoszyk);
  };

  const sumaCalkowita = obliczSume(koszyk);

  return (
    <div className="container mt-4">
      <h2>Sklepik szkolny</h2>

      <ul className="list-group mb-4">
        {produkty.map((produkt) => (
          <li
            key={produkt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {produkt.nazwa} – {produkt.cena.toFixed(2)} zł
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => dodajDoKoszyka(produkt)}
            >
              Do koszyka
            </button>
          </li>
        ))}
      </ul>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>

      {koszyk.length === 0 ? (
        <div className="alert alert-info">Koszyk jest pusty</div>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Ilość</th>
                <th scope="col">Cena</th>
                <th scope="col">Suma</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>
            <tbody>
              {koszyk.map((item) => (
                <tr key={item.id}>
                  <td>{item.nazwa}</td>
                  <td>{item.ilosc}</td>
                  <td>{item.cena.toFixed(2)} zł</td>
                  <td>{(item.cena * item.ilosc).toFixed(2)} zł</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => usunZKoszyka(item.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="fw-bold">Suma: {sumaCalkowita.toFixed(2)} zł</p>
        </>
      )}
    </div>
  );
}

export default App;

