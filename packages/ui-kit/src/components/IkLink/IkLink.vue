<script setup lang="ts">
import '@ui/styles';
import './IkLink.css';
import { computed, h, useSlots } from 'vue';
import { buildUri } from '@ui/utils/helpers';
import { useRender } from '@ui/composables/render';

const props = defineProps({
    to: {
        type: String,
    },
    type: {
        type: String,
        default: 'url',
    },
    target: {
        type: String,
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
    },
});
const slots = useSlots();
const classes = computed(() => {
    const classes = ['ik-link'];

    if (props.underline) {
        classes.push('ik-link--underline');
    }
    if (props.plain) {
        classes.push('ik-link--plain');
    }
    if (props.design) {
        classes.push(`ik-link--${props.design}`);
    }
    return classes;
});

const href = computed(() => {
    let href: string | null = null;

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
    return href;
});

useRender(() => h('a', { class: classes.value, href: href.value, target: props.target }, slots.default?.()));
</script>
