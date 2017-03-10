import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
        path: "/sign-in",
        name: "sign-in",
        component(resolve) {
            require(['./pages/sign-in.vue'],resolve)
        }
    }, {
        path: "/home",
        name: "home",
        component(resolve) {
            require(['./pages/home.vue'],resolve)
        },
        children: [{
            path: "/role-manage",
            name: 'role-manage',
            component(resolve) {
                require(['./pages/role-manage.vue'],resolve)
            }
        },{
            path: "/user-add",
            name: 'user-add',
            component(resolve) {
                require(['./pages/user/user-add.vue'],resolve)
            }
        },{
            path: "/user-list",
            name: 'user-list',
            component(resolve) {
                require(['./pages/user/user-list.vue'],resolve)
            }
        },{
            path: "/user-edit",
            name: 'user-edit',
            component(resolve) {
                require(['./pages/user/user-edit.vue'],resolve)
            }
        },{
            path: "/role-add",
            name: 'role-add',
            component(resolve) {
                require(['./pages/role/role-add.vue'],resolve)
            }
        },{
            path: "/role-list",
            name: 'role-list',
            component(resolve) {
                require(['./pages/role/role-list.vue'],resolve)
            }
        },{
            path: "/role-edit",
            name: 'role-edit',
            component(resolve) {
                require(['./pages/role/role-edit.vue'],resolve)
            }
        },{
            path: "/notice-list",
            name: 'notice-list',
            component(resolve) {
                require(['./pages/notice/notice-list.vue'],resolve)
            }
        },{
            path: "/notice-set",
            name: 'notice-set',
            component(resolve) {
                require(['./pages/notice/notice-set.vue'],resolve)
            }
        },{
            path: "/notice-create",
            name: 'notice-create',
            component(resolve) {
                require(['./pages/notice/notice-create.vue'],resolve)
            }
        },{
            path: "/notice-detail",
            name: 'notice-detail',
            component(resolve) {
                require(['./pages/notice/notice-detail.vue'],resolve)
            }
        },{
            path: "/fund-list",
            name: 'fund-list',
            component(resolve) {
                require(['./pages/fundation/fund-list.vue'],resolve)
            }
        },{
            path: "/fund-add",
            name: 'fund-add',
            component(resolve) {
                require(['./pages/fundation/fund-add.vue'],resolve)
            }
        },{
            path: "/fund-item",
            name: 'fund-item',
            component(resolve) {
                require(['./pages/fundation/fund-item.vue'],resolve)
            }
        },{
            path: "/fund-edit",
            name: 'fund-edit',
            component(resolve) {
                require(['./pages/fundation/fund-edit.vue'],resolve)
            }
        },{
            path: "/fund-detail",
            name: 'fund-detail',
            component(resolve) {
                require(['./pages/fundation/fund-detail.vue'],resolve)
            }
        },{
            path: "/note-list",
            name: 'note-list',
            component(resolve) {
                require(['./pages/note/note-list.vue'],resolve)
            }
        },{
            path: "/note-labellist",
            name: 'note-labellist',
            component(resolve) {
                require(['./pages/note/note-labellist.vue'],resolve)
            }
        },{
            path: "/note-labeladd",
            name: 'note-labeladd',
            component(resolve) {
                require(['./pages/note/note-labeladd.vue'],resolve)
            }
        },{
            path: "/note-labeledit",
            name: 'note-labeledit',
            component(resolve) {
                require(['./pages/note/note-labeledit.vue'],resolve)
            }
        },{
            path: "/note-edit",
            name: 'note-edit',
            component(resolve) {
                require(['./pages/note/note-edit.vue'],resolve)
            }
        },{
            path: "/item-invest",
            name: 'item-invest',
            component(resolve) {
                require(['./pages/item/item-invest.vue'],resolve)
            }
        },{
            path: "/item-uninvest",
            name: 'item-uninvest',
            component(resolve) {
                require(['./pages/item/item-uninvest.vue'],resolve)
            }
        },{
            path: "/item-meeting",
            name: 'item-meeting',
            component(resolve) {
                require(['./pages/item/item-meeting.vue'],resolve)
            }
        },{
            path: "/label-one",
            name: 'label-one',
            component(resolve) {
                require(['./pages/label/label-one.vue'],resolve)
            }
        },{
            path: "/label-two",
            name: 'label-two',
            component(resolve) {
                require(['./pages/label/label-two.vue'],resolve)
            }
        },{
            path: "/label-three",
            name: 'label-three',
            component(resolve) {
                require(['./pages/label/label-three.vue'],resolve)
            }
        },{
            path: "/home",
            redirect: '/user-list'
        }]
    },{
        path: "/",
        redirect: '/sign-in'
    }
]

export default new VueRouter({
	routes
})

export const routerState = {
  previous: null
}