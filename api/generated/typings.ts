/**
 * This file was automatically generated by Nexus 0.11.2
 * Do not make changes to this file directly
 */




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Abofrequences: { // root type
    cle_abo_fq: number; // Int!
    cle_client: number; // Int!
    fq_ca: boolean; // Boolean!
    fq_cod_iata_gare_arr: string; // String!
    fq_cod_iata_gare_dep: string; // String!
    fq_cod_ss_tarif: string; // String!
    fq_cod_tarif: string; // String!
    fq_dt_cmd: string; // String!
    fq_dt_deb_val: string; // String!
    fq_dt_fin_val: string; // String!
    fq_lib_iata_gare_arr: string; // String!
    fq_lib_iata_gare_dep: string; // String!
    fq_statut: string; // String!
    fq_type_abo: string; // String!
    fq_type_freq: string; // String!
    fq_type_ren: string; // String!
  }
  Abotgvmax: { // root type
    cle_abo: number; // Int!
    cle_client: number; // Int!
    compte_personnel_date_expiration: string; // String!
    compte_personnel_statut: string; // String!
    dt_souscription_max: string; // String!
  }
  CarteComm: { // root type
    cle_client: number; // Int!
    cle_cmd: string; // String!
    cle_cr: number; // Int!
    cr_ca: boolean; // Boolean!
    cr_cod_ss_tarif: number; // Int!
    cr_cod_tarif: string; // String!
    cr_dt_deb_val: string; // String!
    cr_dt_fin_val: string; // String!
    cr_status: string; // String!
    cr_type_cr: string; // String!
    cr_type_ren: string; // String!
  }
  Client: { // root type
    cle_client: number; // Int!
    in_age?: number | null; // Int
    in_sexe: string; // String!
    in_top_fid: boolean; // Boolean!
    in_top_nsd: boolean; // Boolean!
    in_top_sncf_connect: boolean; // Boolean!
  }
  Query: {};
  Segment: { // root type
    cle_client: number; // Int!
    cle_dv: number; // Int!
    cle_seg: string; // String!
    cle_titre: number; // Int!
    sg_axe: string; // String!
    sg_ca: number; // Int!
    sg_cod_canal_cmd: string; // String!
    sg_cod_cl_voy: string; // String!
    sg_cod_mon_pay: string; // String!
    sg_cod_ss_canal_cmd: string; // String!
    sg_cod_ss_tarif: string; // String!
    sg_cod_tarif: string; // String!
    sg_code_iata_gare_arr: string; // String!
    sg_code_iata_gare_dep: string; // String!
    sg_dist: string; // String!
    sg_dom_int: string; // String!
    sg_dt_arr_voy: string; // String!
    sg_dt_cmd: string; // String!
    sg_dt_dep_voy: string; // String!
    sg_ebillet: boolean; // Boolean!
    sg_entite: string; // String!
    sg_lib_iata_gare_arr: string; // String!
    sg_lib_iata_gare_dep: string; // String!
    sg_lib_mon_pay: string; // String!
    sg_lib_ss_tarif: string; // String!
    sg_lib_tarif: string; // String!
    sg_num_train: number; // Int!
    sg_route: string; // String!
    sg_secteur: string; // String!
    sg_statut: string; // String!
    sg_transp_d1: string; // String!
    sg_typ_ligne: string; // String!
  }
  aboEvolution: { // root type
    count?: number | null; // Int
    cr_type_cr: string; // String!
  }
  profileAndData: { // root type
    percentageCardOwner: number; // Float!
    percentageInTotal: number; // Float!
    percentageNoneRenewed: number; // Int!
    title: string; // String!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  Abofrequences: { // field return type
    cle_abo_fq: number; // Int!
    cle_client: number; // Int!
    fq_ca: boolean; // Boolean!
    fq_cod_iata_gare_arr: string; // String!
    fq_cod_iata_gare_dep: string; // String!
    fq_cod_ss_tarif: string; // String!
    fq_cod_tarif: string; // String!
    fq_dt_cmd: string; // String!
    fq_dt_deb_val: string; // String!
    fq_dt_fin_val: string; // String!
    fq_lib_iata_gare_arr: string; // String!
    fq_lib_iata_gare_dep: string; // String!
    fq_statut: string; // String!
    fq_type_abo: string; // String!
    fq_type_freq: string; // String!
    fq_type_ren: string; // String!
  }
  Abotgvmax: { // field return type
    cle_abo: number; // Int!
    cle_client: number; // Int!
    compte_personnel_date_expiration: string; // String!
    compte_personnel_statut: string; // String!
    dt_souscription_max: string; // String!
  }
  CarteComm: { // field return type
    cle_client: number; // Int!
    cle_cmd: string; // String!
    cle_cr: number; // Int!
    cr_ca: boolean; // Boolean!
    cr_cod_ss_tarif: number; // Int!
    cr_cod_tarif: string; // String!
    cr_dt_deb_val: string; // String!
    cr_dt_fin_val: string; // String!
    cr_status: string; // String!
    cr_type_cr: string; // String!
    cr_type_ren: string; // String!
  }
  Client: { // field return type
    cle_client: number; // Int!
    in_age: number | null; // Int
    in_sexe: string; // String!
    in_top_fid: boolean; // Boolean!
    in_top_nsd: boolean; // Boolean!
    in_top_sncf_connect: boolean; // Boolean!
  }
  Query: { // field return type
    aboEvolution: NexusGenRootTypes['aboEvolution'][]; // [aboEvolution!]!
    getProfileListAndData: NexusGenRootTypes['profileAndData'][]; // [profileAndData!]!
  }
  Segment: { // field return type
    cle_client: number; // Int!
    cle_dv: number; // Int!
    cle_seg: string; // String!
    cle_titre: number; // Int!
    sg_axe: string; // String!
    sg_ca: number; // Int!
    sg_cod_canal_cmd: string; // String!
    sg_cod_cl_voy: string; // String!
    sg_cod_mon_pay: string; // String!
    sg_cod_ss_canal_cmd: string; // String!
    sg_cod_ss_tarif: string; // String!
    sg_cod_tarif: string; // String!
    sg_code_iata_gare_arr: string; // String!
    sg_code_iata_gare_dep: string; // String!
    sg_dist: string; // String!
    sg_dom_int: string; // String!
    sg_dt_arr_voy: string; // String!
    sg_dt_cmd: string; // String!
    sg_dt_dep_voy: string; // String!
    sg_ebillet: boolean; // Boolean!
    sg_entite: string; // String!
    sg_lib_iata_gare_arr: string; // String!
    sg_lib_iata_gare_dep: string; // String!
    sg_lib_mon_pay: string; // String!
    sg_lib_ss_tarif: string; // String!
    sg_lib_tarif: string; // String!
    sg_num_train: number; // Int!
    sg_route: string; // String!
    sg_secteur: string; // String!
    sg_statut: string; // String!
    sg_transp_d1: string; // String!
    sg_typ_ligne: string; // String!
  }
  aboEvolution: { // field return type
    count: number | null; // Int
    cr_type_cr: string; // String!
  }
  profileAndData: { // field return type
    percentageCardOwner: number; // Float!
    percentageInTotal: number; // Float!
    percentageNoneRenewed: number; // Int!
    title: string; // String!
  }
}

export interface NexusGenArgTypes {
  Query: {
    aboEvolution: { // args
      subscriptionDateActual?: string | null; // String
      subscriptionDateActualCompare?: string | null; // String
      subscriptionDateRequest?: string | null; // String
      subscriptionDateRequestCompare?: string | null; // String
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Abofrequences" | "Abotgvmax" | "CarteComm" | "Client" | "Query" | "Segment" | "aboEvolution" | "profileAndData";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}