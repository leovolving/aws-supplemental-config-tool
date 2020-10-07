import { h } from 'preact';
import style from './style.css'

const PageSection = ({children}) => {
    return <section className={style.pageSection}>{children}</section>
}

export default PageSection;