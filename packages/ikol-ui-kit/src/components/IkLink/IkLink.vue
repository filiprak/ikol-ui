<script lang="ts">
import '@/styles';
import './IkLink.css';
import { defineComponent, h } from 'vue';
import { buildUri } from '@/utils/helpers';

export default defineComponent({
    name: 'IkLink',
    props: {
        to: {
            type: String,
            default: null,
        },
        type: {
            type: String,
            default: 'url',
        },
        target: {
            type: String,
            default: null,
        },
        underline: {
            type: Boolean,
            default: false,
        },
        plain: {
            type: Boolean,
            default: false,
        },
        design: {
            type: String,
            default: null,
        },
    },
    setup(props, { slots }) {
        const classes = ['ik-link'];
        let href: string | null = null;

        if (props.underline) {
            classes.push('ik-link--underline');
        }
        if (props.plain) {
            classes.push('ik-link--underline');
        }
        if (props.design) {
            classes.push(`ik-link--${props.design}`);
        }

        if (props.to) {
            switch (props.type) {
                case 'url':
                    href = buildUri(props.to);
                    break;
                case 'email':
                    href = buildUri(props.to, { protocol: 'mailto' });
                    break;
                case 'phone':
                    href = buildUri(props.to, { protocol: 'tel' });
                    break;
                default:
                    href = buildUri(props.to);
                    break;
            }
        } else {
            href = 'javascript:void(0);';
        }

        return () => h('a', { class: classes, href }, slots.default?.());
    },
});
</script>
