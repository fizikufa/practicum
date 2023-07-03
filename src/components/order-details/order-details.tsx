import "@ya.praktikum/react-developer-burger-ui-components";
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";

interface TOrderDetailsProps{
    number: number
}

const OrderDetails = ({number}:TOrderDetailsProps) => {
    return (
        <div className={styles.checkout}>
            <p className={styles.order_number}>{number}</p>
            <p className="text text_type_main-medium mb-10">идентификатор заказа</p>
            <div className={styles.done}>
                <CheckMarkIcon type="primary" />
            </div>
            <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;