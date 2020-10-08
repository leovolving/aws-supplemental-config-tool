import { h } from 'preact';
import style from './style.css'

const PageSection = ({children, className=''}) => {
    return <section className={`${style.pageSection} ${className}`}>{children}</section>
}

export default PageSection;