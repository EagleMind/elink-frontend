import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../Redux/auth/profile/actions";
import { updateProfile } from "../../Redux/auth/profile/actions";
import showPass from "../../Assets/Auth/showpass.svg";
import hidePass from "../../Assets/Auth/hidepass.svg";

const Profile = () => {
  const state = useSelector((state) => state.profile).profile;

  const id = state._id;
  const dispatch = useDispatch();
  useEffect(() => {
    profile();
  }, [id]);

  const [passwordShownConfirm, setPasswordShownConfirm] = useState(false);

  const showPasswordConfirm = (e) => {
    setPasswordShownConfirm(!passwordShownConfirm);
  };
  const [email, setEmail] = useState(state?.email);
  const [password, setPassword] = useState(state?.password);
  const [lastName, setLastName] = useState(state?.lastName);
  const [firstName, setFirstName] = useState(state?.firstName);
  const [cPassword, setCPassword] = useState("");
  const [fielderror, setFieldError] = useState("");
  const resetFields = (e) => {
    setEmail("");
    setPassword("");
    setLastName("");
    setFirstName("");
    setCPassword("");
    setFieldError("");
  };
  const onChangeEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  const onChangePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
  };

  const onChangeLastName = (e) => {
    const value = e.target.value;
    setLastName(value);
  };

  const onChangeFirstName = (e) => {
    const value = e.target.value;
    setFirstName(value);
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const showPassword = (e) => {
    setPasswordShown(!passwordShown);
  };
  const OnChangeCPassword = (e) => {
    setCPassword(e.target.value);
    setFieldError("");
  };

  const onProfileUpdate = (e) => {
    e.preventDefault();
    const id = state._id;
    let payload;

    if (password !== cPassword) {
      setFieldError("Not identical password!");
    } else {
      payload = { firstName, lastName, email, password };
      dispatch(updateProfile(payload, id));
    }
  };

  return (
    <div className="space-y-10 sm:border sm:border-grey2 md:drop-shadow-lg border-grey2 rounded-lg bg-white0 p-10 mx-15 ">
      <div className="space-y-12">
        <p className="font-bold text-[19px]">Paramètres</p>
      </div>

      <form className=" " onSubmit={onProfileUpdate}>
        <div className="space-y-10">
          <div className="flex-col space-y-5 tablet:mx-10">
            <div>
              <div>
                <label className="font-bold md:text-[12px] font-mulish text-grey1">
                  PRÉNOM
                </label>
              </div>
              <div>
                <input
                  className="placeholder:text-[14px] box-border h-10 tablet:w-80 w-60  border-2 rounded-lg border-grey3 px-3"
                  type="text"
                  name="Prénom"
                  onChange={onChangeFirstName}
                  placeholder={state.firstName}
                />
              </div>
            </div>
            <div>
              <div>
                <label className="font-bold md:text-[12px] font-mulish text-grey1  ">
                  NOM
                </label>
              </div>
              <div>
                <input
                  className="placeholder:text-[14px] box-border h-10 tablet:w-80 w-60  border-2 rounded-lg border-grey3 px-3"
                  type="text"
                  name="Nom"
                  onChange={onChangeLastName}
                  placeholder={state.lastName}
                />
              </div>
            </div>
            <div>
              <div>
                <label className="font-bold md:text-[12px] font-mulish text-grey1  ">
                  EMAIL
                </label>
              </div>
              <div>
                <input
                  className="placeholder:text-[14px] box-border h-10 tablet:w-80 w-60  border-2 rounded-lg border-grey3 px-3"
                  type="Email"
                  name="email"
                  onChange={onChangeEmail}
                  placeholder={state.email}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between py-1">
                <label className="font-bold md:text-[12px] font-mulish text-grey1">
                  NOUVEAU MOT DE PASSE
                </label>
              </div>

              <div className="flex relative flex-row items-center box-border h-10 w-80 border-2 rounded-lg border-grey3 ">
                <img
                  width={40}
                  className="absolute inset-y-0 right-0 px-2 py-2"
                  src={passwordShown ? showPass : hidePass}
                  onClick={showPassword}
                  alt="show password"
                />
                <input
                  className=" bg-background border border-grey3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  onChange={(e) => onChangePassword(e)}
                  placeholder={"Mot de passe"}
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between ">
                <label className="font-bold md:text-[12px] font-mulish text-grey1 py-1">
                  CONFIRMER LE MOT DE PASSE
                </label>
              </div>
              <div className="flex relative flex-row items-center box-border h-10 w-80 border-2 rounded-lg border-grey3 ">
                <img
                  width={40}
                  className="absolute inset-y-0 right-0 px-2 py-2"
                  src={passwordShownConfirm ? showPass : hidePass}
                  onClick={showPasswordConfirm}
                  alt="show password"
                />
                <input
                  className="bg-background border border-grey3  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type={passwordShownConfirm ? "text" : "password"}
                  name="cPassword"
                  value={cPassword}
                  onChange={(e) => OnChangeCPassword(e)}
                  placeholder={"Confirmer"}
                />
              </div>
              {fielderror ? <p className="text-red-500"> {fielderror} </p> : ""}
            </div>
            <div className="flex flex-row justify-items-start justify-between space-x-2">
              <button
                type="submit"
                className={`mt-2 box-border h-[52px] w-[362px]  border-1 rounded-lg text-white0 bg-blue1 font-bold text-[20px] drop-shadow-md
     
          `}
              >
                Enregistrer
              </button>

              <button
                className={`mt-2 box-border h-[52px] w-[362px]  border-1 rounded-lg bg-white0 drop-shadow-md text-blue1 font-bold text-[20px] 
     
                `}
                type="reset"
                onClick={resetFields}
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
