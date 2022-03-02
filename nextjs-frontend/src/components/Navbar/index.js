import Link from 'next/link';
import ThemeContext from '../Context/ThemeContext';

import styles from '../../../styles/Navbar.module.css';

const Navbar = () => (
    <ThemeContext.Consumer>
        {value => {
            const {isDarkTheme, toggleTheme} = value
            return (
                <>
                {!isDarkTheme ? (
                    <div className={styles.navBarContainerLight}>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/website-logo-light-theme-img.png"
                        className={styles.websiteLogo}
                        alt="website logo"
                    />
                    <ul className={styles.middleItems}>
                        <li className={styles.listItem}>
                        <Link href="/" className={styles.linkLight}>
                            Home
                        </Link>
                        </li>
                        <li className={styles.listItem}>
                        <Link href="/createNFT" className={styles.linkLight}>
                            Sell NFT
                        </Link>
                        </li>
                        <li className={styles.listItem}>
                        <Link href="/myAssets" className={styles.linkLight}>
                            My Assets
                        </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className={styles.themeButton}
                        testid="theme"
                        onClick={toggleTheme}
                    >
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/dark-theme-img.png"
                        className={styles.themeImg}
                        alt="theme"
                        />
                    </button>
                    </div>
                ) : (
                    <div className={styles.navbarContainerDark}>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/website-logo-dark-theme-img.png"
                        className={styles.websiteLogo}
                        alt="website logo"
                    />
                    <ul className={styles.middleItems}>
                        <li className={styles.listItem}>
                        <Link href="/" className={styles.listDark}>
                            Home
                        </Link>
                        </li>
                        <li className={styles.listItem}>
                        <Link href="/about" className={styles.linkDark}>
                            About
                        </Link>
                        </li>
                    </ul>
                    <button
                        type="button"
                        className={styles.themeButton}
                        testid="theme"
                        onClick={toggleTheme}
                    >
                        <img
                        src="https://assets.ccbp.in/frontend/react-js/light-theme-img.png"
                        className={styles.themeImg}
                        alt="theme"
                        />
                    </button>
                    </div>
                )}
                </>
            )
            }}
    </ThemeContext.Consumer>
)

export default Navbar;