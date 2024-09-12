import IkModal from './IkModal.vue';
import IkModalRenderer from './IkModalRenderer.vue';
import IkModalContent from './IkModalContent.vue';
import IkModalHeader from './IkModalHeader.vue';
import IkModalBody from './IkModalBody.vue';
import IkModalFooter from './IkModalFooter.vue';
import IkModalQuick from './IkModalQuick.vue';
import IkModalConfirm from './IkModalConfirm.vue';

export interface IkModal extends InstanceType<typeof IkModal> { };
export interface IkModalRenderer extends InstanceType<typeof IkModalRenderer> { };
export interface IkModalContent extends InstanceType<typeof IkModalContent> { };
export interface IkModalHeader extends InstanceType<typeof IkModalHeader> { };
export interface IkModalBody extends InstanceType<typeof IkModalBody> { };
export interface IkModalFooter extends InstanceType<typeof IkModalFooter> { };
export interface IkModalQuick extends InstanceType<typeof IkModalQuick> { };
export interface IkModalConfirm extends InstanceType<typeof IkModalConfirm> { };

export { IkModal };
export { IkModalRenderer };
export { IkModalContent };
export { IkModalHeader };
export { IkModalBody };
export { IkModalFooter };
export { IkModalQuick };
export { IkModalConfirm };
