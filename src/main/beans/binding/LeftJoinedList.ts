// import IndexedList from "./IndexedList";
// import mixin from "../../funciton/mixin";

// // K: $key
// // P: primaryList(not null)
// // S: secondaryList(optional)

// // TODO: 要素変更の監視
// export default class LeftJoinedList<K, P, S> extends IndexedList<K, P & { [E in keyof S]: E | undefined }> {
//     constructor(primaries: IndexedList<K, P>,
//         secondaries: IndexedList<K, S>,
//         foreignKeySupplier: (secondaryVal: S) => K = secondaries.keySupplier) {
//         // 2つのリストを結合した新しいリストを生成する
//         const initialValues: ((P & S) | P)[] = []
//         primaries.keyValueMap.forEach((v, k) => {
//             const secondary = secondaries.keyValueMap.find(k)
//             initialValues.push(secondary == null ? v : mixin(v, secondary))
//         })

//         // 優先要素は必ず存在するため、優先リストのキー生成器を使用する
//         super(it => primaries.keySupplier(it))
//         super.push(...initialValues as any)

//         // 優先リストの変更監視
//         primaries.addArrayListener((appends, removes) => {
//             // 無条件で自リストから削除する
//             removes.forEach(it => {
//                 const key = primaries.keySupplier(it)
//                 const val = this.keyValueMap.find(key)
//                 if (val) {
//                     // 存在しないことはあり得ないが念のため
//                     this.remove(val)
//                 } else {
//                     throw new Error('存在しないルート')
//                 }
//             })
//             // サブ要素と結合し、自リストに追加する
//             appends.forEach(it => {
//                 const key = primaries.keySupplier(it)
//                 // サブ要素から、優先要素のキーを外部キーにもつ要素を探す
//                 const secondary = secondaries.values.find(sec => foreignKeySupplier(sec) === key)
//                 const current = this.keyValueMap.find(key)
//                 if (current) {
//                     // 優先要素追加時は自要素が存在しないはずだからいらない気がする
//                     this.remove()
//                 }
//                 this.push(secondary == null ? it : mixin(it, secondary) as any)
//             })
//         })
//         primaries.addElementListener((now, old) => {
//             const key = primaries.keySupplier(now)
//             const self = this._obsValues.find(it => this.keySupplier(it.value) === key)
//             const secondary = secondaries.values.find(sec => foreignKeySupplier(sec) === key)
//             // もともと存在する要素なら更新する
//             if (self != null) {
//                 if (secondary != null) {
//                     self.value = mixin(now, secondary) as any
//                 } else {
//                     self.value = now as any
//                 }
//             }
//         })

//         // サブリストの変更監視
//         secondaries.addArrayListener((appends, removes) => {
//             // 自要素からサブ要素のみ削除する
//             removes.forEach(it => {
//                 const key = foreignKeySupplier(it)
//                 const val = this.keyValueMap.find(key)
//                 if (val) {
//                     // 一度要素削除してから、優先要素のみで再度挿入する
//                     this.remove(val)
//                     this.push(primaries.keyValueMap.find(key) as any)
//                 } // 存在しない場合＝優先要素のみ存在 or 要素なし
//             })

//             // 優先要素と結合し、自リストに追加する
//             // ※優先要素が存在しない場合は追加しない
//             appends.forEach(it => {
//                 const key = foreignKeySupplier(it)
//                 const primary = primaries.keyValueMap.find(key)
//                 if (primary) {
//                     // すでに存在する自要素を一旦削除する
//                     if (this.keyValueMap.has(key)) {
//                         this.remove(this.keyValueMap.find(key) as any)
//                     }
//                     // 優先要素が存在する場合のみpushする
//                     this.push(mixin(primary, it) as any)
//                 }
//             })
//         })
//         secondaries.addElementListener((now, old) => {
//             const key = foreignKeySupplier(now)
//             const self = this._obsValues.find(it => this.keySupplier(it.value) === key)
//             const primary = primaries.keyValueMap.find(key)
//             // もともと存在する要素なら更新する
//             if (self != null) {
//                 self.value = mixin(primary, now) as any
//             }
//         })
//     }
// }


