import React, { useEffect, useState } from "react";
import CrudForm from "./CrudForm";
import CrudTable from "./CrudTable";
import { helpHttp } from "../helpers/helpHttp";
import Loader from "./Loader";
import Message from "./Message";


const CrudApi = () => {
    const [db, setDb] = useState(null);
    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:4000/santos";

    //peticion de la base de datos
    useEffect(() => {
        setLoading(true);
        api.get(url).then((res) => {
            //console.log(res);
            if (!res.err) {
                setDb(res);
                setError(null);
            } else {
                setDb([]);
                setError(res);
            }
            setLoading(false);
        });
    },[url]);
   // console.log(db)
    const createData = (data) => {
        data.id = Date.now();
        //console.log(data);
        let options = { body: data, headers:{ "content-type": "application/json" }};

        api.post(url, options).then((res) => {
            //console.log(res);
            if (!res.err) {
                setDb([...db, res]);
            } else {
                setError(res);
            }
        })
    };

    const updateData = (data) => {
    
    };

    const deleteData = (data) => {
        let isDelete = window.confirm(`¿Estás seguro de eliminar el registro ${data.id}?`);
        if (isDelete) {
            let newData = db.filter((el) => el.id !== data.id);
            setDb(newData);
        } else {
            return;
        }
    };


  return (
    <div>
      <h1>CRUD API</h1>
      <article className="grid-1-2">
      <CrudForm 
      createData={createData}
      updateData={updateData}
      dataToEdit={dataToEdit}
      setDataToEdit={setDataToEdit}
      />
      {loading && <Loader />}
      {error && (
      <Message 
      msg={`Error ${error.status}: ${error.statusText}`} 
       bgColor="#dc3545" 
       />
       )}
      {db && <CrudTable 
      data={db} 
      setDataToEdit={setDataToEdit}
      deleteData={deleteData}
      />}
      </article>
    </div>
  );
};

export default CrudApi;


