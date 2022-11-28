import { useRef } from 'react';
import PropTypes from 'prop-types';
import './chat.css';

const ChatContent = ({ open }) => {
    const contentRef = useRef(0);

    return (
        <div className="content-parent" ref={contentRef} style={open ? { height: contentRef.current.scrollHeight + "px" } : { height: "0px" }}>
            <div className="content"> 
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci sed magnam minima numquam, minus mollitia cumque? Libero perspiciatis repellendus cumque inventore iure, nemo provident repudiandae, ratione dolor quo error corporis?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse perspiciatis a corrupti corporis doloremque id sapiente maxime doloribus eius cumque minima deserunt veniam, iusto quo odit laborum ab temporibus ut.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, harum. Distinctio ad asperiores ipsam a error quibusdam laboriosam, neque reprehenderit voluptas itaque harum corporis, incidunt facilis et veniam blanditiis voluptatum!
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia consequatur molestiae praesentium autem obcaecati numquam reiciendis dicta dolores et. In consequuntur quo quibusdam, itaque explicabo id consequatur iusto harum laudantium.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates velit similique nesciunt cumque, dicta, iste officiis reiciendis praesentium exercitationem distinctio accusamus quas maxime enim magni vitae deleniti eos corporis neque?
            Omnis maxime quo vel repellendus ipsum officiis veritatis iure ut totam, accusantium aperiam ducimus facilis. Corrupti cupiditate nisi, a eum dolorem, tempora aperiam omnis earum molestiae dicta molestias nobis aspernatur!
            Totam perspiciatis et odit reiciendis provident sit recusandae unde suscipit dolorum labore nemo ea voluptatibus quam, explicabo, sapiente dicta blanditiis dolorem illo omnis voluptates illum veniam. Iste nam inventore illo.
            Magnam earum inventore aut! Ipsam excepturi facilis quod at autem unde, culpa cupiditate neque quidem beatae soluta distinctio voluptates, consectetur aspernatur iusto. Debitis cumque, molestias fugiat voluptatem rem excepturi iusto?
            Modi placeat maxime vel voluptatem ad. Excepturi, ut fugiat totam nemo voluptas commodi perspiciatis suscipit, quas impedit consequatur, fugit quis voluptatem odio nisi doloribus officiis id sit consequuntur! Aut, omnis!
            Sed maxime, excepturi dolores eius vel ratione nulla neque quas corporis at? Quam dolor sunt, voluptatibus rem error nulla reprehenderit tenetur adipisci ducimus illo recusandae consequuntur ipsa animi iure aliquam?
            Nemo, est sequi velit veniam amet doloribus ullam modi corrupti esse, iste nulla consectetur quam labore voluptate ratione dolor assumenda fugiat, ducimus aliquam alias. Deserunt autem eos cum ipsam illo.
            Sequi earum dolorum at doloremque alias, blanditiis aliquid qui? Dignissimos repudiandae est laboriosam, facere, veritatis pariatur rerum consequuntur accusantium ratione sunt expedita maxime aut officia quas assumenda nemo. Amet, illum?
            Reprehenderit impedit porro assumenda atque, repudiandae voluptatibus doloribus dolores blanditiis vero, ipsum quis labore explicabo? Rem molestiae quae, quisquam aliquid autem, delectus aspernatur, excepturi possimus recusandae natus fuga sint tempore?
            In itaque pariatur explicabo officiis minima. Ullam facilis quisquam consectetur id, nihil soluta suscipit? Ipsum, fuga nesciunt qui eum dolore alias, distinctio minima consequatur amet numquam quaerat, necessitatibus facere autem.
            </div>
        </div>
    )
}

ChatContent.propTypes = {
    open: PropTypes.bool,
};

export default ChatContent;