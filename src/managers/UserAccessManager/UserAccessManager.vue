<template>
	<PkpTable class="mt-2">
		<template #label>
			<h3 class="text-3xl-bold">
				{{ t('grid.user.currentUsers') }} ({{
					store.userAccessPagination.itemCount
				}})
			</h3>
		</template>
		<template #top-controls>
			<div class="flex gap-x-2">
				<component
					:is="Components[action.component] || action.component"
					v-bind="action.props || {}"
					v-for="(action, i) in store.topItems"
					:key="i"
				></component>
			</div>
		</template>
		<TableHeader>
			<TableColumn v-for="(column, i) in store.columns" :key="i">
				<span :class="column.headerSrOnly ? 'sr-only' : ''">
					{{ column.header }}
				</span>
			</TableColumn>
		</TableHeader>
		<TableBody>
			<TableRow v-for="user in store.userList" :key="user.id">
				<component
					:is="Components[column.component] || column.component"
					v-for="(column, i) in store.columns"
					:key="i"
					:user="user"
				></component>
			</TableRow>
		</TableBody>
	</PkpTable>
	<TablePagination
		:pagination="store.userAccessPagination"
		@set-page="store.setCurrentPage"
	/>
</template>

<script setup>
import PkpTable from '@/components/Table/Table.vue';
import TableHeader from '@/components/Table/TableHeader.vue';
import TableColumn from '@/components/Table/TableColumn.vue';
import TableBody from '@/components/Table/TableBody.vue';
import TableRow from '@/components/Table/TableRow.vue';
import {useUserAccessManagerStore} from './UserAccessManagerStore.js';
import TablePagination from '@/components/Table/TablePagination.vue';
import {useLocalize} from '@/composables/useLocalize';
import UserAccessManagerCellStartDate from './UserAccessManagerCellStartDate.vue';
import UserAccessManagerCellUserGroups from './UserAccessManagerCellUserGroups.vue';
import UserAccessManagerCellActions from './UserAccessManagerCellActions.vue';
import UserAccessManagerCellName from './UserAccessManagerCellName.vue';
import UserAccessManagerCellEmail from './UserAccessManagerCellEmail.vue';
import UserAccessManagerCellAffiliation from './UserAccessManagerCellAffiliation.vue';
import UserAccessManagerActionSearch from './UserAccessManagerActionSearch.vue';

const Components = {
	UserAccessManagerCellStartDate,
	UserAccessManagerCellUserGroups,
	UserAccessManagerCellActions,
	UserAccessManagerCellName,
	UserAccessManagerCellEmail,
	UserAccessManagerCellAffiliation,
	UserAccessManagerActionSearch,
};

const store = useUserAccessManagerStore();
const {t} = useLocalize();
</script>
