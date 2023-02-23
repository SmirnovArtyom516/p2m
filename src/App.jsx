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
// import './App.css';
import './Train.css';

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
        <div className="GoBack">
          <Arrow />
          <a href="/" className="backText">
            Назад
          </a>
        </div>
        {!flag
          ? (
            <div>
              {!user.name
                ? (
                  <div className="content">
                    <Pay2me />
                    <h5 className="IntoText">
                      Войти в личный кабинет
                    </h5>
                    <Auth className="authText" />
                    <form
                      className="form"
                      onSubmit={AuthHandler}
                    >
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
                    {error && <span className="error">Такого телефона не существует</span>}
                    <div className="RegText">
                      <div className="textq">
                        <span>У вас еще нет аккаунта?</span>
                        <a href="/" className="question">
                          Зарегистрироваться
                        </a>
                      </div>
                      <div className="textq">
                        <span>Возникли проблемы со входом?</span>
                        <a href="/" className="question">
                          Восстановить доступ
                        </a>
                      </div>
                    </div>
                  </div>
                )
                : (
                  <div className="content">
                    <div>
                      <Pay2me />
                      <h5 className="IntoText">{`Здравствуйте, ${user.name}!`}</h5>
                      <div>
                        <p className="enterTextForNumber">{`Введите пароль для номера +7(${user.phone[1]}${user.phone[2]}${user.phone[3]})****-**-${user.phone[9]}${user.phone[10]}`}</p>
                      </div>
                    </div>
                    <form className="form">
                      <div className="input-group">
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Введите пароль" />
                      </div>
                      <div style={{ position: 'relative', right: '58px', top: '10px' }}>
                        <Visible
                          onClick={() => setshowPassword(!showPassword)}
                          className="visible"
                        />
                      </div>
                      <div>
                        <Button
                          onClick={() => {
                            setFlag(!flag);
                            setError('Возможно, электронная почта или парооль введены некорректно. Попробуйте ещё раз.');
                          }}
                          type="button"
                          className="btn btn-primary"
                        >
                          Далее
                          <AroowRight />
                        </Button>
                      </div>
                    </form>
                    <div className="RegText">
                      <div className="textq">
                        <span>У вас еще нет аккаунта?</span>
                        <a href="/" className="question">
                          Зарегистрироваться
                        </a>
                      </div>
                      <div className="textq">
                        <span>Возникли проблемы со входом?</span>
                        <a href="/" className="question">
                          Восстановить доступ
                        </a>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          )
          : (
            <div className="content">
              <div>
                <Pay2me />
                <h5 className="IntoText">Ой что то пошло не так</h5>
                <div>
                  <p className="enterTextForNumber">Вы ввели неверный логин или пароль.</p>
                </div>
              </div>
              <form className="form-end">
                <div className="input-group">
                  <div>
                    <input style={{ borderColor: 'red', width: '380px', height: '48px' }} value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" placeholder="Введите номер телефона или почту" />
                  </div>
                  <div>
                    {error && <span className="error">Возможно, электронная почта введена некорректно. Попробуйте ещё раз.</span>}
                  </div>
                </div>
                <div className="input-group">
                  <div>
                    <input style={{ borderColor: 'red', width: '380px', height: '48px' }} value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Введите пароль" />
                  </div>
                  <div>
                    {error && <span className="error">Возможно, электронная почта введена некорректно. Попробуйте ещё раз.</span>}
                  </div>
                </div>
                <div style={{ position: 'relative', left: '391px', bottom: '105px' }}>
                  <Visible
                    onClick={() => setshowPassword(!showPassword)}
                    className="visible"
                  />
                </div>
                <div>
                  <Button
                    style={{ width: '377px' }}
                    type="button"
                    className="btn btn-primary"
                  >
                    Далее
                  </Button>
                </div>
              </form>
              <div className="RegText">
                <div className="textq">
                  <span>У вас еще нет аккаунта?</span>
                  <a href="/" className="question">
                    Зарегистрироваться
                  </a>
                </div>
                <div className="textq">
                  <span>Возникли проблемы со входом?</span>
                  <a href="/" className="question">
                    Восстановить доступ
                  </a>
                </div>
              </div>
            </div>
          )}
        <div className="footer">
          <div className="address">
            <span className="pay2meTxt">
              Ⓒ PAY2ME 2023
            </span>
            <span className="adressTxt">ООО «Куарми» ИНН 7743364603</span>
            <span className="adressTxt">Юридический адрес 125445, Г. Москва, Ул. Беломорская, Д. 11, К. 1/290</span>
          </div>
          <div className="politic">
            <a href="/" className="polit1">
              Политика конфиденциальности
            </a>
            <a href="/" className="polit1">
              Пользовательское соглашение
            </a>
          </div>
        </div>
        <div className="language">
          <div className="tooltipDiv">
            <OverlayTrigger trigger="click" placement="top" overlay={popover}>
              <Button style={{ backgroundColor: 'transparent', borderColor: 'white' }} variant="danger" ref={target} onClick={() => setShow(!show)}>
                <FlagRu />
              </Button>
            </OverlayTrigger>
            <span style={{
              position: 'absolute',
              top: '10px',
            }}
            >
              Ru

            </span>
          </div>
          <div>
            <Chat style={{
              position: 'absolute',
              bottom: '66px',
            }}
            />
          </div>
        </div>
      </div>
      <div className="App-right">
        <Picture className="Logo" />
      </div>
    </div>
  );
}

export default App;
