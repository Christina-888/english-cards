import styles from './header.module.css'
import logo from '../assets/images/icons/glasses.svg'

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <img className={styles.logoImg} src={logo} alt="logo" />
    </div>
  )
}

export default Header;