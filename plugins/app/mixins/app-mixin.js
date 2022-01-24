export default async function ({ app }) {
	(app.mixins = app.mixins ?? []).push({
    beforeCreate() {
      globalThis.$nuxt = this
      
      globalThis.$nextTick = $nuxt.$nextTick
      globalThis.$set = $nuxt.$set
      globalThis.$delete = $nuxt.$delete
      globalThis.$assign = (target, source) => {
        for (const key of Object.keys(source))
          $set(target, key, source[key])
      }
      globalThis.$merge = (target, ...sources) => {
        for (const source of sources) {
          for (const [key, value] of Object.entries(source)) {
            if (value != null && value.constructor === Object)
              $set(target, key, $merge(target[key] ?? {}, value))
            else
              $set(target, key, value)
          }
        }
      
        return target
      }

      globalThis.$store = $nuxt.$store
      globalThis.$getters = $store.getters
      globalThis.$commit = $store.commit

      if (!globalThis.$state) {
        Object.defineProperty(globalThis, '$state', {
          get() { return $store.state },
          set(value) { $store.replaceState(value) },
        })
      }
    },

    created() {
      $app.init()
    },
	})
}