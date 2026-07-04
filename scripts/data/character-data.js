export default class QuestCharacterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;

    return {      
      hp: new fields.SchemaField({
        value: new fields.NumberField({
          required: true,
          integer: true,
          initial: 10,
          min: 0
        }),
        max: new fields.NumberField({
          required: true,
          integer: true,
          initial: 10,
          min: 0
        })
      }),
      ap: new fields.NumberField({
        required: true,
        integer: true,
        initial: 10,
        min: 0
      }),
      armor: new fields.NumberField({
        required: true,
        integer: true,
        initial: 0,
        min: 0
      }),
      inventorySlots: new fields.NumberField({ required: true, integer: true, initial: 12, min: 0 }),
      containers: new fields.ArrayField(
        new fields.SchemaField({
          id: new fields.StringField({ required: true }),
          name: new fields.StringField({ required: true, initial: "New Container" }),
          slots: new fields.NumberField({ required: true, integer: true, initial: 6, min: 0 })
        }),
        { initial: [] }
      ),
      profilePronouns: new fields.StringField({ blank: true, initial: "" }),
      profileAge: new fields.StringField({ blank: true, initial: "" }),
      profileHeight: new fields.StringField({ blank: true, initial: "" }),
      profileRole: new fields.StringField({ blank: true, initial: "" }),
      profileFeature1: new fields.StringField({ blank: true, initial: "" }),
      profileFeature2: new fields.StringField({ blank: true, initial: "" }),
      profileFeature3: new fields.StringField({ blank: true, initial: "" }),
      profileStyle1: new fields.StringField({ blank: true, initial: "" }),
      profileStyle2: new fields.StringField({ blank: true, initial: "" }),
      profileStyle3: new fields.StringField({ blank: true, initial: "" }),
      profileHome: new fields.StringField({ blank: true, initial: "" }),
      profileCommunity: new fields.StringField({ blank: true, initial: "" }),
      profileIdeal: new fields.StringField({ blank: true, initial: "" }),
      profileFlaw: new fields.StringField({ blank: true, initial: "" }),
      profileDream: new fields.StringField({ blank: true, initial: "" }),
      notes: new fields.HTMLField({ required: false, blank: true, initial: "" })
    };
  }
}