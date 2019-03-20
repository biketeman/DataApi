const {objectType} = require('nexus')

module.exports = objectType({
	name: 'Segment',
	description: '',
	definition(t) {
		t.int('cle_client', {
			description: 'clé du client',
			nullable: false
		})
		t.int('cle_seg', {
			description: 'clé du segment',
			nullable: false
		})
		t.int('cle_dv', {
			description: 'clé du dossier de voyage',
			nullable: false
        })
        t.int('cle_titre', {
			description: 'clé du dossier de voyage',
			nullable: false
		})
		t.string('sg_dt_cmd', {
			description: 'clé titre',
			nullable: false
		})
		t.string('sg_statut', {
			description: 'clé du segment',
			nullable: false
		})
		t.int('sg_ca', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_typ_ligne', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_cl_voy', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_dt_dep_voy', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_dt_arr_voy', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_code_iata_gare_dep', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_code_iata_gare_arr', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_lib_iata_gare_dep', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_lib_iata_gare_arr', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_canal_cmd', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_ss_canal_cmd', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_tarif', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_lib_tarif', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_ss_tarif', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_lib_ss_tarif', {
			description: 'clé du segment',
			nullable: false
		})
		t.int('sg_num_train', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_dom_int', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_cod_mon_pay', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_lib_mon_pay', {
			description: 'clé du segment',
			nullable: false
		})
		t.boolean('sg_ebillet', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_dist', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_transp_d1', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_axe', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_secteur', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_route', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('sg_entite', {
			description: 'clé du segment',
			nullable: false
		})
		t.string('cle_seg', {
			description: 'clé du segment',
			nullable: false
		})
	}
})