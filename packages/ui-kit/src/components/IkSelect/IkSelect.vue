<template>
    <div :class="root_class">
        <IkPopover ref="dropdown_ref"
                   :content_class="popover_class"
                   open_on_click
                   align="start"
                   position="horizontal"
                   :offset="5"
                   use_activator_width
                   :min_width="min_dropdown_width || 120"
                   :max_width="max_dropdown_width"
                   @ik-open="onDropdownOpen()"
                   @ik-close="onDropdownClose()">
            <template #activator="{ on }">
                <slot name="activator"
                      :on="on"
                      :selected="selected_item">
                    <div :tabindex="skip_tab ? -1 : 0"
                         :class="control_class"
                         :disabled="disabled ? '' : undefined"
                         @mousedown.stop="onControlMouseDown()">
                        <template v-if="show_chip && selected_item">
                            <IkSelectChip :size="size"
                                          :clearable="clearable"
                                          @ik-clear="clear">
                                <template v-if="show_img"
                                          #prepend>
                                    <slot name="image"
                                          :item="selected_item">
                                        <IkImage :size="img_size"
                                                 :round="round_img"
                                                 :src="toImage(selected_item)" />
                                    </slot>
                                </template>
                                <slot name="selected"
                                      :item="selected_item">
                                    {{ toText(selected_item) }}
                                </slot>
                            </IkSelectChip>
                        </template>
                        <template v-else>
                            <div class="ik-select__value">
                                <span v-if="!selected_item && placeholder"
                                      v-show="!filter || (filter && !opened)"
                                      class="ik-text--placeholder">
                                    {{ placeholder }}
                                </span>
                                <template v-else-if="selected_item && (!opened || !filter)">
                                    <slot name="selected-wrapper"
                                          :item="selected_item">
                                        <IkListItem inline
                                                    class="ik-select__selected">
                                            <template v-if="show_img"
                                                      #prepend>
                                                <slot name="image"
                                                      :item="selected_item">
                                                    <IkImage :size="img_size"
                                                             :round="round_img"
                                                             :src="toImage(selected_item)" />
                                                </slot>
                                            </template>
                                            <slot name="selected"
                                                  :item="selected_item">
                                                {{ toText(selected_item) }}
                                            </slot>
                                            <template v-if="clearable"
                                                      #append>
                                                <IkIcon icon="times:light"
                                                        @mousedown.stop
                                                        @click.stop="clear()" />
                                            </template>
                                        </IkListItem>
                                    </slot>
                                </template>
                                <input v-if="filter"
                                       ref="search_ref"
                                       v-model="search"
                                       type="text"
                                       class="ik-select__search"
                                       placeholder="[[_*en*Search_]]"
                                       :tabindex="skip_tab ? -1 : 0"
                                       @input="dropdown_ref?.recalculate()"
                                       @keydown="onSearchKeyDown">
                            </div>
                            <div class="ik-select__actions">
                                <IkLoaderCircle v-if="loading && !loading_more"
                                                indeterminate
                                                :size="16"
                                                :thickness="2" />
                                <IkIcon v-else
                                        class="ik-select__indicator"
                                        icon="chevron-down:regular" />
                            </div>
                        </template>
                    </div>
                </slot>
            </template>
            <div class="ik-select__items"
                 :style="{ height: popover_height_px }">
                <IkSelectScroll ref="list_ref"
                                :virtual="!!virtual_scroller"
                                :items="filtered_items"
                                :pagination="pagination"
                                :loading="loading_more"
                                @ik-load-more="loadMoreItems">
                    <template #item="{ item }">
                        <div :key="toKey(item)"
                             class="ik-select__item-wrapper"
                             @click="!isItemDisabled(item) ? onOptionClick(item) : null">
                            <slot name="item"
                                  :item="item">
                                <IkSelectItem :disabled="isItemDisabled(item)">
                                    <template v-if="show_img"
                                              #prepend>
                                        <slot name="image"
                                              :item="item">
                                            <IkImage :size="dropdown_img_size || img_size"
                                                     :round="round_img"
                                                     :src="toImage(item)" />
                                        </slot>
                                    </template>
                                    {{ toText(item) }}
                                    <template v-if="show_subtext"
                                              #subtext>
                                        {{ toSubtext(item) }}
                                    </template>
                                </IkSelectItem>
                            </slot>
                        </div>
                    </template>
                    <div v-if="error"
                         class="ik-select__error">
                        [[_*en*Failed to load results_]].
                    </div>
                    <div v-else-if="filtered_items.length == 0"
                         class="ik-select__empty">
                        <template v-if="loading">
                            [[_*en*Loading results_]]...
                        </template>
                        <slot v-else
                              name="empty">
                            <template v-if="filter">
                                [[_*en*No search results_]]
                            </template>
                            <template v-else>
                                [[_*en*No items_]]
                            </template>
                        </slot>
                    </div>
                </IkSelectScroll>
            </div>
        </IkPopover>
    </div>
</template>
<script setup lang="ts" generic="ItemT extends {}, ValueT = ItemT">
import '@ui/styles';
import './IkSelect.css';
import { computed, nextTick, onBeforeMount, ref, shallowRef, watch } from 'vue';
import { IkPopover } from '@ui/components/IkPopover';
import { IkIcon } from '@ui/components/IkIcon';
import { IkImage } from '@ui/components/IkImage';
import { IkLoaderCircle } from '@ui/components/IkLoaderCircle';
import type { IkSelectItemLoader } from '@ui/components/IkSelect';
import { IkSelectItem, IkSelectChip } from '@ui/components/IkSelect';
import IkSelectScroll from './IkSelectScroll.vue';
import { IkListItem } from '@ui/components/IkList';

import { toCssUnits, isFunction, debounce } from '@ui/utils/helpers';
import type { IkExtractExposed, IkKeysByType } from '@ui/types/utils';

const props = withDefaults(
    defineProps<{
        modelValue?: ValueT;
        selected?: ItemT;
        items: ItemT[] | IkSelectItemLoader<ItemT>;
        items_per_page?: number;
        items_debounce_ms?: number;
        lazy?: boolean;
        clearable?: boolean;
        unique_key?: keyof ItemT;
        value_key?: IkKeysByType<ItemT, ValueT | undefined>;
        text_key?: keyof ItemT,
        text_expression?: (item: ItemT) => string;
        subtext_key?: keyof ItemT,
        subtext_expression?: (item: ItemT) => string;
        img_key?: keyof ItemT,
        img_expression?: (item: ItemT) => string;
        img_size?: number,
        dropdown_img_size?: number,
        round_img?: boolean,
        size?: string;
        min_dropdown_width?: string | number;
        max_dropdown_width?: string | number;
        variant?: string;
        variant_chip?: boolean;
        filter?: boolean;
        placeholder?: string;
        disabled?: boolean;
        disabled_items?: (item: ItemT) => boolean;
        inline?: boolean;
        skip_tab?: boolean;
        virtual_scroller?: boolean;
    }>(),
    {
        variant: 'flat',
        img_size: (props) => (props.size == 'xs' ? 18 : 24),
        items_per_page: 15,
        items_debounce_ms: 500,
    },
);

const emit = defineEmits<{
    (e: 'update:modelValue', value?: ValueT): void,
    (e: 'update:selected', value?: ItemT): void,
    (e: 'ik-open'): void,
    (e: 'ik-close'): void,
}>();

const MAX_POPOVER_HEIGHT = 264;
const dropdown_ref = ref<IkPopover>();
const search_ref = ref<HTMLInputElement>();
const list_ref = ref<IkExtractExposed<typeof IkSelectScroll>>();
const opened = ref(false);
const search = ref('');
const loading = ref(false);
const loading_more = ref(false);
const loaded = ref(false);
const reload_on_open = ref(true);
const pagination = ref({
    detected: false,
    offset: 0,
    has_more: false,
});
const error = ref(false);
const results = shallowRef<ItemT[]>([]);
const lazy_render = ref(false);
const popover_height_px = ref<string>();
const unique_key = computed(() => String(props.value_key || props.unique_key || 'id') as keyof ItemT);
const is_primary = computed(() => !!props.value_key);
const is_async = computed(() => isFunction(props.items));
const show_chip = computed(() => props.variant_chip && (!opened.value || !props.filter) && !!selected_item.value);
const show_img = computed(() => !!props.img_key || !!props.img_expression);
const show_subtext = computed(() => !!props.subtext_key || !!props.subtext_expression);

const root_class = computed(() => {
    return {
        'ik-select': true,
        'ik-select--chip': props.variant_chip,
        'ik-select--inline': props.inline,
        'ik-select--open': opened.value,
    };
});

const cached_items = computed(() => {
    return results.value.reduce((acc, item) => {
        acc[toKey(item)] = item;
        return acc;
    }, {} as Record<string, ItemT>);
});

const selected_item = computed(() => {
    if (props.modelValue !== undefined) {
        if (is_primary.value) {
            return cached_items.value[String(props.modelValue)];
        } else {
            return props.modelValue as unknown as ItemT;
        }
    } else {
        return undefined;
    }
});

const popover_class = computed(() => {
    const classes: Record<string, boolean> = {};
    if (props.size) {
        classes['ik-select__popover--' + props.size] = true;
    }
    return classes;
});

const control_class = computed(() => {
    const classes: Record<string, boolean> = {
        'ik-select__control': true,
        'ik-select__control--chip': show_chip.value,
        'ik-f-input': true,
    };
    if (props.size) {
        classes['ik-f-input--size-' + props.size] = true;
    }
    classes['ik-f-input--' + props.variant] = !show_chip.value;
    return classes;
});

const filtered_items = computed(() => {
    let filtered = results.value;

    if ((!is_async.value || !pagination.value.detected) && props.filter && search.value) {
        filtered = filtered.filter(item => {
            return toText(item).toLowerCase().indexOf(search.value.toLowerCase()) > -1;
        });
    }
    if (props.lazy && !lazy_render.value) {
        filtered = selected_item.value ? [selected_item.value] : [];
    }
    return filtered;
});

function toValue(item: ItemT) {
    if (props.value_key) {
        return item[props.value_key] as ValueT;
    } else {
        return item as unknown as ValueT;
    }
}

function toKey(item: ItemT) {
    return String(item[unique_key.value]);
}

function toText(item: ItemT) {
    if (props.text_key) {
        return String(item[props.text_key]);
    } else if (props.text_expression) {
        return props.text_expression(item);
    } else {
        return JSON.stringify(item);
    }
}

function toSubtext(item: ItemT) {
    if (props.subtext_key) {
        return String(item[props.subtext_key]);
    } else if (props.subtext_expression) {
        return props.subtext_expression(item);
    } else {
        return '';
    }
}

function toImage(item: ItemT) {
    if (props.img_key) {
        return String(item[props.img_key]);
    } else if (props.img_expression) {
        return props.img_expression(item);
    } else {
        return '';
    }
}

function onSearchKeyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
        case 8: // backspace
            break;
        case 13: // enter
            if (filtered_items.value.length > 0) {
                const first_item = filtered_items.value[0];

                emit('update:modelValue', toValue(first_item));

                search.value = '';
                close();
            }
            event.preventDefault();
            break;
        case 27: // esc
            close();
            break;
    }
}

function onOptionClick(item: ItemT) {
    emit('update:modelValue', toValue(item));
    close();
}

function isItemDisabled(item: ItemT) {
    if (props.disabled_items) {
        return props.disabled_items(item);
    } else {
        return false;
    }
}

function open() {
    if (!props.disabled) {
        dropdown_ref.value?.open();

        const stop = watch(opened, (v) => {
            stop();
            nextTick(() => {
                setTimeout(() => {
                    search_ref.value?.focus();
                }, 0);
            });
        });
        setTimeout(stop, 80);
    }
}

function close() {
    dropdown_ref.value?.close();
    search_ref.value?.blur();
}

function focus() {
    open();
}

function clear() {
    emit('update:modelValue', undefined);
}

function onControlMouseDown() {
    if (!opened.value) {
        open();
    }
}

function onDropdownOpen() {
    if (props.variant && props.lazy) {
        lazy_render.value = true;
    }
    opened.value = true;
}

function onDropdownClose() {
    search.value = '';
    opened.value = false;

    emit('ik-close');
}

function refreshDropdown() {
    let c_height = list_ref.value?.getContentHeight() ?? undefined;

    c_height = c_height ?? MAX_POPOVER_HEIGHT;

    popover_height_px.value = toCssUnits(Math.min(c_height, MAX_POPOVER_HEIGHT));
    dropdown_ref.value?.recalculate();
}

function loadItems(offset: number, append = false) {
    error.value = false;
    loading.value = true;

    if (isFunction(props.items)) {
        return props
            .items({
                limit: props.items_per_page,
                offset,
                search_string: search.value,
            })
            .then(chunk => {
                loaded.value = true;

                if (append) {
                    results.value = results.value.concat(chunk.items);
                } else {
                    results.value = chunk.items;
                }

                pagination.value.detected = chunk.has_more !== undefined;
                pagination.value.offset = chunk.offset || 0;
                pagination.value.has_more = !!chunk.has_more;
            })
            .catch((e) => {
                error.value = true;
                throw e;
            })
            .finally(() => {
                loading.value = false;
                loading_more.value = false;

                if (!append) {
                    list_ref.value?.scrollTop(0);
                }
                nextTick(refreshDropdown);
            });
    } else {
        throw new Error('Unable to load items');
    }
}

const loadItemsDebounced = debounce(loadItems, props.items_debounce_ms);

function loadMoreItems() {
    if (pagination.value.has_more) {
        loading_more.value = true;
        loadItemsDebounced(pagination.value.offset + props.items_per_page, true);
    }
}

watch(opened, (new_val, old_val) => {
    if (new_val && new_val !== old_val) {
        if (is_async.value) {
            reload_on_open.value && loadItems(0);
            reload_on_open.value = false;
        }

        nextTick(() => {
            setTimeout(() => {
                refreshDropdown();

                list_ref.value?.scrollTop(0);
                search_ref.value?.focus();
            }, 0);
        });
    }
    if (new_val) {
        emit('ik-open');
    } else {
        emit('ik-close');
    }
});

watch(filtered_items, (new_val, old_val) => {
    if (new_val && new_val.length !== old_val.length) {
        nextTick(() => {
            setTimeout(() => {
                refreshDropdown();
            }, 0);
        });
    }
});

watch(search, (new_val, old_val) => {
    list_ref.value?.scrollTop(0);

    if (pagination.value.detected) {
        if (opened.value) {
            loading.value = true;
            loadItemsDebounced(0);
        } else {
            reload_on_open.value = true;
        }
    } else {
        nextTick(refreshDropdown);
    }
});

watch(selected_item, (val) => {
    emit('update:selected', val);
}, { immediate: true });

onBeforeMount(() => {
    if (is_async.value) {
        if (props.value_key) {
            loadItems(0);
            reload_on_open.value = false;
        }
    } else {
        results.value = isFunction(props.items) ? [] : props.items;
    }
    if (!props.value_key && !props.unique_key) {
        throw new Error('Either value_key or unique_key prop must be passed to IkSelect to work correctly');
    }
});

defineExpose({
    open,
    close,
    focus,
});
</script>
