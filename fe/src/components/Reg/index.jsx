import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import cookie from 'react-cookies'

export default function Reg() {
    const [mail, setMail] = useState();
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const [phone, setPhone] = useState();
    const [login, setLogin] = useState();
    const [pwd, setPwd] = useState();

    const [isRegged, setIsRegged] = useState(false);

    async function registration(){
        const body = { 
            mail,
            name,
            surname,
            phone,
            login,
            pwd,
         };
        await axios.post('http://localhost:5000/reg', body, { withCredentials: true })
          .then((response) => {
            alert(JSON.stringify(response));
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
        setIsRegged(true)
    }
    return (
      // returning a registration form with a front-end validation using simple HTML\CSS things
        <>
        <form className={styles.form} onSubmit={registration} style={{border: '2px solid black'}}>
            <p>Registration form!</p>
            <div className={styles.form__field}>
              <input type="email" value={mail} onChange={e => setMail(e.target.value) } placeholder={'Mail*'} required />
              <span className={styles.form__error}>This field must contain E-Mail in the format example@site.com</span>
            </div>
            <div className={styles.form__field}>
              <input type="text" value={name} onChange={e => setName(e.target.value) } placeholder={'Name*'} minLength="2" maxLength="18" required/>
              <span className={styles.form__error}>This field must be between 2 and 18 characters</span>
            </div>
            <div className={styles.form__field}>
              <input type="text" value={surname} onChange={e => setSurname(e.target.value) } placeholder={'Surname*'} minLength="2" maxLength="18" required/>
              <span className={styles.form__error}>This field must be between 2 and 18 characters</span>
            </div>
            <div className={styles.form__field}>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value) } placeholder={'Phone*'} minLength="10" maxLength="10" pattern='\d{10}' required/>
              <span className={styles.form__error}>This field must be 10 digits</span>
            </div>
            <div className={styles.form__field}>
              <input type="text" value={login} onChange={e => setLogin(e.target.value) } placeholder={'Login*'} minLength="2" maxLength="18" required/>
              <span className={styles.form__error}>Nickname must be between 2 and 18 characters</span>
            </div>
            <div className={styles.form__field}>
              <input type="password" value={pwd} onChange={e => setPwd(e.target.value) } placeholder={'Password*'} minLength="8" maxLength="24" required/>
              <span className={styles.form__error}>Password must be between 8 and 24 characters</span>
            </div>
            <input type="submit" value="Register!"/>
        </form>
        </>
    )
}
