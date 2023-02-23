import React, { useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  Button, OverlayTrigger, Popover,
} from 'react-bootstrap';
import { ReactComponent as Picture } from './utils/logo.svg';
import { ReactComponent as Pay2me } from './utils/PAY2ME.svg';
import { ReactComponent as Arrow } from './utils/arrow-left.svg';
import { ReactComponent as Auth } from './utils/auth.svg';
import { ReactComponent as AroowRight } from './utils/arrow-right.svg';
import { ReactComponent as FlagRu } from './utils/FlagRu.svg';
import { ReactComponent as FlagUSA } from './utils/USAFlag.svg';
import { ReactComponent as Chat } from './utils/Chat.svg';
import { ReactComponent as Visible } from './utils/Eye.svg';
import { users } from './api/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      <Button
        style={{ backgroundColor: 'transparent' }}
        className="btn btn-outline-primary"
        variant="danger"
      >
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <FlagRu />
          RU
          <span>Русский</span>
        </div>
      </Button>
      <br />
      <Button variant="danger">
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <FlagUSA />
          EN
          <span>Английский</span>
        </div>
      </Button>
    </Popover.Body>
  </Popover>
);

function App() {
  const [user, setUser] = useState({});
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorlog, setErrolog] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [show, setShow] = useState(false);
  const [flag, setFlag] = useState(false);
  const target = useRef(null);

  const AuthHandler = (e) => {
    e.preventDefault();
    users.map((el) => (el.phone === phone ? setUser(el) : setError('Ошибка')));
  };

  return (
    <div className="Main">
      <div className="App-left">
        <Arrow className="Arrow" />
        <a href="/" className="GoBack">
          Назад
        </a>
        <Pay2me className="Pay2me" />
        {!flag
          ? (
            <div>
              {!user.name
                ? (
                  <>
                    <h5 className="IntoText">
                      Войти в личный кабинет
                    </h5>
                    <Auth className="authText" />
                    <form onSubmit={AuthHandler}>
                      <div className="input-group">
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" placeholder="Введите номер телефона или почту" />
                      </div>
                      <div>
                        <Button type="submit" className="btn btn-primary">
                          Далее
                          <AroowRight />
                        </Button>
                      </div>
                    </form>
                    {error && <span className="errorPhone">Такого телефона не существует</span>}
                    <div className="RegText">
                      <span className="RegistrationText">У вас еще нет аккаунта?</span>
                      <a href="/" className="Registration">
                        Зарегистрироваться
                      </a>
                    </div>
                    <div className="RegText">
                      <span className="questionText">Возникли проблемы со входом?</span>
                      <a href="/" className="question">
                        Восстановить доступ
                      </a>
                    </div>
                  </>
                )
                : (
                  <>
                    {' '}
                    <h5 className="IntoText">{`Здравствуйте, ${user.name}!`}</h5>
                    <span className="enterTextForNumber">{`Введите пароль для номера +7(${user.phone[1]}${user.phone[2]}${user.phone[3]})****-**-${user.phone[9]}${user.phone[10]}`}</span>
                    <form>
                      <div className="input-group">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Введите пароль" />
                        <Visible
                          onClick={() => setshowPassword(!showPassword)}
                          className="visible"
                        />
                        <div />
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setFlag(!flag);
                            setErrolog('Возможно, электронная почта или парооль введены некорректно. Попробуйте ещё раз.');
                            console.log(errorlog);
                          }}
                          type="submit"
                          className="btn btn-primary"
                        >
                          Далее
                          <AroowRight />
                        </Button>
                      </div>
                    </form>
                    <div className="RegText">
                      <span className="RegistrationText">У вас еще нет аккаунта?</span>
                      <a href="/" className="Registration">
                        Зарегистрироваться
                      </a>
                    </div>
                    <div className="RegText">
                      <span className="questionText">Возникли проблемы со входом?</span>
                      <a href="/" className="question">
                        Восстановить доступ
                      </a>
                    </div>
                  </>
                )}
            </div>
          )
          : (
            <div style={{ position: 'relative' }}>
              <h5 className="IntoText">Что то пошло не так</h5>
              <span className="enterTextForNumber">Вы ввели неверный логин или пароль</span>
              <div className="input-group">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  className="errorPhoneInput"
                  placeholder="Введите номер телефона или почту"
                />
                {errorlog && (
                <span
                  style={{
                    position: 'absolute',
                    top: '1px',
                    width: '40vh',
                    left: '2px',
                  }}
                  className="errorPhone"
                >
                  Возможно, электронная почта или парооль введены некорректно. Попробуйте ещё раз.
                </span>
                )}
                <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="errorPasswordInput" placeholder="Введите пароль" />
                {errorlog && (
                <span
                  style={{
                    position: 'absolute',
                    top: '100px',
                    left: '2px',
                    width: '40vh',
                  }}
                  className="errorPhone"
                >
                  Возможно, электронная почта или парооль введены некорректно. Попробуйте ещё раз.
                </span>
                )}
              </div>
              <Button
                style={{
                  position: 'absolute', top: '658px', left: '339px', width: '304px',
                }}
                type="submit"
                className="btn btn-primary"
              >
                Далее
              </Button>
              <div style={{ position: 'absolute', width: '100vh', top: '150px' }}>
                <div className="RegText">
                  <span className="RegistrationText">У вас еще нет аккаунта?</span>
                  <a href="/" className="Registration">
                    Зарегистрироваться
                  </a>
                </div>
                <div className="RegText">
                  <span className="questionText">Возникли проблемы со входом?</span>
                  <a href="/" className="question">
                    Восстановить доступ
                  </a>
                </div>
              </div>
            </div>
          )}
        <span className="sPay2me">
          Ⓒ PAY2ME 2023
        </span>
        <span className="addres1">ООО «Куарми» ИНН 7743364603</span>
        <span className="addres2">Юридический адрес 125445, Г. Москва, Ул. Беломорская, Д. 11, К. 1/290</span>
        <div className="tooltipDiv">
          <OverlayTrigger trigger="click" placement="top" overlay={popover}>
            <Button style={{ backgroundColor: 'transparent', borderColor: 'white' }} variant="danger" ref={target} onClick={() => setShow(!show)}>
              <FlagRu />
            </Button>
          </OverlayTrigger>
          <span style={{ position: 'absolute', left: '50px', bottom: '5px' }}>Ru</span>
        </div>
        <div>
          <Chat className="Chat" />
        </div>
      </div>
      <a href="/" className="politic">
        Политика конфиденциальности
      </a>
      <a href="/" className="userConfirm">
        Пользовательское соглашение
      </a>
      <div className="App-right">
        <Picture className="Logo" />
      </div>
    </div>
  );
}

export default App;
