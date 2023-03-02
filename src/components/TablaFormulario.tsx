import { use, useState } from "react";
import styled from "styled-components";
import Image from 'next/image';
import ReactDOM from "react-dom";
import app from "next/app";
import { NormalizeError } from "next/dist/shared/lib/utils";


const TablaFormulario = ()  => {

    const [nombreError, setNombreError] = useState<boolean>(false);
    const [dniError, setDniError] = useState<boolean>(false);
    const [nombre, setNombre] = useState<string>("");
    const [dni, setDni] = useState<string>("");
    const [listaNombre, setListaNombre] = useState<string[]>([]);
    const [listaDni, setListaDni] = useState<string[]>([]);


    const validateNameConError = (name: string) : boolean => {
        if (/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(name)) {
            return false;
        }
        else {
            return true;
        }
    }


    const validateDniConError = (dni: string) : boolean => {
        if (/^[0-9]{8}[BCDFGHJKLMNPRSTVWXYZ]{1}$/.test(dni)) {
            return false;
        }
        else {
            return true;
        }
    }


    return (
        <>


        <h1>Informacion de personas</h1>



        <DivFormulario>
            <DivSepararComponentesFormulario>
                
                <ParrafosFormulario>Introdude tu nombre: </ParrafosFormulario> <InputFormulario error={nombreError} id="textoNombre" type="text" placeholder="Nombre" onBlur={(e) => setNombreError(validateNameConError(e.target.value))}
                onChange={(e) => {
                    if (nombreError) {
                        setNombreError(validateNameConError(e.target.value))}
                        setNombre(e.target.value);
                    }
                }/>
                
                {nombreError && <>  El nombre es incorrecto</>}
            </DivSepararComponentesFormulario>
                
            <DivSepararComponentesFormulario>
                <ParrafosFormulario>Introdude tu dni: </ParrafosFormulario> <InputFormulario error={dniError} id="textoDni" type="text" placeholder="Dni" maxLength={9} onBlur={(e) => setDniError(validateDniConError(e.target.value))}
                onChange={(e) => {
                    if (dniError) {
                        setDniError(validateDniConError(e.target.value))}
                        setDni(e.target.value);
                    }
                }/>
                
                {dniError && <>  El Dni es incorrecto</>}
            </DivSepararComponentesFormulario>

            <BotonAdd type="button" onClick={() => {

                if (dniError || nombreError) {
                    console.log("dni o nombre estan mal puestos");
                }
                else {
                    setListaNombre( [...listaNombre, nombre] );
                    setListaDni( [...listaDni, dni] );


                }

                
            }}>Añadir</BotonAdd>

        </DivFormulario>


        <DivContainerTable id="tablaInformacion">

            <DivTitle>Datos del usuario</DivTitle>

            <DivHeader>Nombre</DivHeader>            
            <DivHeader>DNI</DivHeader>
            <DivHeader>Borrar informacion</DivHeader>

            <DivElementosPorColumna sizeArrayMayorQueCero={listaNombre.length > 0}>
                {listaNombre.map((item, index) => (
                    <DivContainerElementos key={index}>{item}</DivContainerElementos>
                ))}
            </DivElementosPorColumna>

            <DivElementosPorColumna sizeArrayMayorQueCero={listaDni.length > 0}>
                {listaDni.map((item, index) => (
                    <DivContainerElementos key={index}>{item}</DivContainerElementos>
                ))}
            </DivElementosPorColumna>

            <DivElementosPorColumna sizeArrayMayorQueCero={listaNombre.length > 0}>
                {listaNombre.map((item, index) => (
                    <DivContainerElementos>
                        <Image src="/Imagenes/papelera.jpg" alt="una foto" width={30} height={18} onClick={() => {
                            setListaDni(listaDni.filter((_, i) => i !== index));
                            setListaNombre(listaNombre.filter((_, i) => i !== index));
                        }}></Image>
                    </DivContainerElementos>
                ))}
            </DivElementosPorColumna>
            
        </DivContainerTable>

        </>
    )
}

type InputProps = {
    error: boolean
}

const InputFormulario = styled.input<InputProps>`
    background-color: ${props => props.error ? "red" : "white"};
`

const DivContainerTable = styled.div`
    background-color: white;
    margin: 50px auto;
    box-shadow: 0 0 30px #333;


    width: 1650px;

    display: grid;
    grid-template-columns: repeat(3, 1fr); // Significa que se hagan 2 columnas y se repartan en 2 fracciones
    grid-auto-rows: 55px; // El alto de cada filas es de 50 pixeles
`

const DivTitle = styled.div`
    grid-column-start: 1;
    grid-column-end: 4; // Ponemos 4 porque la el borde de la tabla cuenta como linea

    background: rgba(40, 65, 120, 1);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 30px;
    border: 2px solid black;
`

const DivHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    

    font-weight: bold;
    font-size: 25px;
    border: 3px solid black;
    background-color: rgba(208, 31, 31, 1);
`

type DivTieneContenidoProps = {
    sizeArrayMayorQueCero: boolean
}

const DivElementosPorColumna = styled.div<DivTieneContenidoProps>`
    display: ${props => props.sizeArrayMayorQueCero ? "flex" : "none"};
    flex-direction: column;
    border: 1 px solid black;
`

const DivContainerElementos = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    background-color: #ffee00c0;

    height: 55px;
    width: 524px;
    font-size: 16px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
    border: 3px solid black;
`


const DivFormulario = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin: 10px;
`

const DivSepararComponentesFormulario = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    padding: 10px;
`

const BotonAdd = styled.button`
    min-width: 130px;
    height: 40px;
    color: #fff;
    padding: 5px 10px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
    border-radius: 5px;
    border: 2px solid #212529;
    background: #212529;       
`

const ParrafosFormulario = styled.p`
    font-weight: 15px;
    font-weight: bolder;
`





export default TablaFormulario;

/*
<DivContainerElementos id="gonza" className="sanz">Diego</DivContainerElementos>
    Estamos creado esto porque necesitamos que next genere la clase asociada, y el diseño lo hacemos con los styled-components
*/

/*
<DivContainerElementos>Diego</DivContainerElementos>
            <DivContainerElementos>05953694Y</DivContainerElementos>
            <DivContainerElementos> <Image src="/Imagenes/papelera.jpg" alt="una foto" width={40} height={40} onClick={eliminarDatoTabla}/> </DivContainerElementos>

            <DivContainerElementos>Julio</DivContainerElementos>
            <DivContainerElementos>12345678U</DivContainerElementos>
            <DivContainerElementos> <Image src="/Imagenes/papelera.jpg" alt="una foto" width={40} height={40} onClick={eliminarDatoTabla}/></DivContainerElementos>
*/