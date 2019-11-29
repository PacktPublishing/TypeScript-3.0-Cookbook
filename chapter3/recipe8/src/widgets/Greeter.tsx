import { create, tsx } from '@dojo/framework/core/vdom';
import icache from '@dojo/framework/core/middleware/icache';

const factory = create({ icache }).properties<{
    name: string;
    onNameChange?(newName: string): void;
}>();

export default factory(function Greeter({ middleware: { icache }, properties }) {
    const { name, onNameChange } = properties();
    let newName = icache.get<string>('new-name') || '';
    return (
        <div>
            <div key="appBanner">Welcome to a Dojo application!</div>
            {name && <div key="nameBanner">Hello, {newName}!</div>}
            <label for="nameEntry">What's your name?</label>
            <input
                id="nameEntry"
                type="text"
                value={newName}
                oninput={(e: Event) => {
                    icache.set('new-name', (e.target as HTMLInputElement).value);
                }}
            />
            <button
                onclick={() => {
                    icache.set('new-name', undefined);
                    onNameChange && onNameChange(newName);
                }}
            >
                Set my name
            </button>
        </div>
    );
});