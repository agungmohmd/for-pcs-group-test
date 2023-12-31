PGDMP     .                    y            pidb    13.1    13.1 U    E           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            F           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            G           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            H           1262    65543    pidb    DATABASE     g   CREATE DATABASE pidb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Indonesian_Indonesia.1252';
    DROP DATABASE pidb;
                postgres    false            �            1259    82198    awblists    TABLE     �   CREATE TABLE public.awblists (
    awbid integer NOT NULL,
    courier character varying NOT NULL,
    awbno character varying NOT NULL,
    orderid character varying NOT NULL
);
    DROP TABLE public.awblists;
       public         heap    postgres    false            �            1259    82196    awblists_awbid_seq    SEQUENCE     �   CREATE SEQUENCE public.awblists_awbid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.awblists_awbid_seq;
       public          postgres    false    226            I           0    0    awblists_awbid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.awblists_awbid_seq OWNED BY public.awblists.awbid;
          public          postgres    false    225            �            1259    65544    branches    TABLE     v   CREATE TABLE public.branches (
    id integer NOT NULL,
    customer_id integer,
    branch_name character varying
);
    DROP TABLE public.branches;
       public         heap    postgres    false            �            1259    65550    branches_id_seq    SEQUENCE     �   CREATE SEQUENCE public.branches_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.branches_id_seq;
       public          postgres    false    200            J           0    0    branches_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.branches_id_seq OWNED BY public.branches.id;
          public          postgres    false    201            �            1259    65552    campaign_transacts    TABLE     K  CREATE TABLE public.campaign_transacts (
    id integer NOT NULL,
    campaignid character varying NOT NULL,
    phone_number character varying NOT NULL,
    trysend_at timestamp(0) with time zone,
    is_delivered boolean,
    delivered_at timestamp(0) with time zone,
    guid character varying,
    errcode character varying
);
 &   DROP TABLE public.campaign_transacts;
       public         heap    postgres    false            �            1259    65558    campaign_transact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.campaign_transact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.campaign_transact_id_seq;
       public          postgres    false    202            K           0    0    campaign_transact_id_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.campaign_transact_id_seq OWNED BY public.campaign_transacts.id;
          public          postgres    false    203            �            1259    65560 	   campaigns    TABLE       CREATE TABLE public.campaigns (
    campaignid character varying NOT NULL,
    created_by character varying NOT NULL,
    created_on timestamp without time zone NOT NULL,
    approved_by character varying,
    approved_on timestamp without time zone,
    campaign_name character varying NOT NULL,
    approval boolean,
    customer_id integer NOT NULL,
    branch_id integer NOT NULL,
    message character varying(160) NOT NULL,
    scheduled_on timestamp(0) without time zone,
    is_scheduled boolean DEFAULT false NOT NULL
);
    DROP TABLE public.campaigns;
       public         heap    postgres    false            �            1259    65567 	   customers    TABLE     �   CREATE TABLE public.customers (
    id integer NOT NULL,
    customer_name character varying NOT NULL,
    email character varying,
    address character varying,
    username character varying NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    65570    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public          postgres    false    205            L           0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public          postgres    false    206            �            1259    65572    modules    TABLE     \   CREATE TABLE public.modules (
    id integer NOT NULL,
    module_name character varying
);
    DROP TABLE public.modules;
       public         heap    postgres    false            �            1259    65578    modules_id_seq    SEQUENCE     �   CREATE SEQUENCE public.modules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.modules_id_seq;
       public          postgres    false    207            M           0    0    modules_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.modules_id_seq OWNED BY public.modules.id;
          public          postgres    false    208            �            1259    65670    order_details    TABLE     8  CREATE TABLE public.order_details (
    orderid character varying NOT NULL,
    orderdetail_id character varying NOT NULL,
    productid character varying NOT NULL,
    qty numeric NOT NULL,
    price_each numeric DEFAULT 0 NOT NULL,
    price numeric DEFAULT 0 NOT NULL,
    modal numeric DEFAULT 0 NOT NULL
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false            �            1259    65662    orders    TABLE     �  CREATE TABLE public.orders (
    orderid integer NOT NULL,
    ordering_username character varying NOT NULL,
    sending_address character varying NOT NULL,
    ordered_at timestamp(0) without time zone NOT NULL,
    ispaid_confirm boolean NOT NULL,
    paid_confirmation_date timestamp(0) without time zone,
    total_price numeric DEFAULT 0 NOT NULL,
    is_approved boolean NOT NULL,
    receipt_img character varying
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    65660    orders_orderid_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_orderid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.orders_orderid_seq;
       public          postgres    false    218            N           0    0    orders_orderid_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.orders_orderid_seq OWNED BY public.orders.orderid;
          public          postgres    false    217            �            1259    65788    prod_category    TABLE     k   CREATE TABLE public.prod_category (
    catid integer NOT NULL,
    cat_name character varying NOT NULL
);
 !   DROP TABLE public.prod_category;
       public         heap    postgres    false            �            1259    65786    prod_category_catid_seq    SEQUENCE     �   CREATE SEQUENCE public.prod_category_catid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.prod_category_catid_seq;
       public          postgres    false    221            O           0    0    prod_category_catid_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.prod_category_catid_seq OWNED BY public.prod_category.catid;
          public          postgres    false    220            �            1259    65643    products    TABLE     �  CREATE TABLE public.products (
    productid integer NOT NULL,
    productname character varying NOT NULL,
    batch character varying,
    createdby character varying NOT NULL,
    created_on timestamp(0) without time zone NOT NULL,
    edited_by character varying,
    edited_on timestamp(0) without time zone,
    current_stock numeric DEFAULT 0 NOT NULL,
    has_sold numeric DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT false NOT NULL,
    product_code character varying NOT NULL,
    prodcat_id character varying,
    description character varying,
    modal numeric DEFAULT 0 NOT NULL,
    sellprice numeric DEFAULT 0 NOT NULL,
    img_url character varying
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    65641    products_productid_seq    SEQUENCE     �   CREATE SEQUENCE public.products_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.products_productid_seq;
       public          postgres    false    216            P           0    0    products_productid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.products_productid_seq OWNED BY public.products.productid;
          public          postgres    false    215            �            1259    65580    role_modules    TABLE     9  CREATE TABLE public.role_modules (
    role_id character varying NOT NULL,
    module_id character varying NOT NULL,
    allow_create boolean DEFAULT false NOT NULL,
    allow_read boolean DEFAULT false NOT NULL,
    allow_update boolean DEFAULT false NOT NULL,
    allow_delete boolean DEFAULT false NOT NULL
);
     DROP TABLE public.role_modules;
       public         heap    postgres    false            �            1259    65590    roles    TABLE     X   CREATE TABLE public.roles (
    id integer NOT NULL,
    role_name character varying
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    65596    roles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.roles_id_seq;
       public          postgres    false    210            Q           0    0    roles_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
          public          postgres    false    211            �            1259    73989    stashes    TABLE     �   CREATE TABLE public.stashes (
    username character varying NOT NULL,
    productid character varying NOT NULL,
    product_code character varying NOT NULL,
    price numeric NOT NULL,
    qty numeric NOT NULL
);
    DROP TABLE public.stashes;
       public         heap    postgres    false            �            1259    82189    stock_update_history    TABLE     ]  CREATE TABLE public.stock_update_history (
    updateid integer NOT NULL,
    productid character varying NOT NULL,
    isincrease boolean NOT NULL,
    howmany numeric NOT NULL,
    refference character varying,
    description character varying,
    created_on timestamp(0) without time zone NOT NULL,
    created_by character varying NOT NULL
);
 (   DROP TABLE public.stock_update_history;
       public         heap    postgres    false            �            1259    82187 !   stock_update_history_updateid_seq    SEQUENCE     �   CREATE SEQUENCE public.stock_update_history_updateid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 8   DROP SEQUENCE public.stock_update_history_updateid_seq;
       public          postgres    false    224            R           0    0 !   stock_update_history_updateid_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public.stock_update_history_updateid_seq OWNED BY public.stock_update_history.updateid;
          public          postgres    false    223            �            1259    65598    tasks    TABLE     �   CREATE TABLE public.tasks (
    id integer NOT NULL,
    campaignid character varying NOT NULL,
    scheduled_on timestamp(0) without time zone NOT NULL,
    do_at timestamp(0) without time zone,
    is_sent boolean
);
    DROP TABLE public.tasks;
       public         heap    postgres    false            �            1259    65604    tasks_id_seq    SEQUENCE     �   CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    212            S           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    213            �            1259    65606    users    TABLE     �  CREATE TABLE public.users (
    username character varying(35) NOT NULL,
    password character varying NOT NULL,
    roleno character varying NOT NULL,
    created_by character varying(25) NOT NULL,
    created_on timestamp without time zone NOT NULL,
    updated_by character varying(25),
    updated_on timestamp without time zone,
    customer_id character varying,
    branch_id character varying,
    is_active boolean DEFAULT false NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �           2604    82201    awblists awbid    DEFAULT     p   ALTER TABLE ONLY public.awblists ALTER COLUMN awbid SET DEFAULT nextval('public.awblists_awbid_seq'::regclass);
 =   ALTER TABLE public.awblists ALTER COLUMN awbid DROP DEFAULT;
       public          postgres    false    225    226    226            �           2604    65627    branches id    DEFAULT     j   ALTER TABLE ONLY public.branches ALTER COLUMN id SET DEFAULT nextval('public.branches_id_seq'::regclass);
 :   ALTER TABLE public.branches ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200            �           2604    65628    campaign_transacts id    DEFAULT     }   ALTER TABLE ONLY public.campaign_transacts ALTER COLUMN id SET DEFAULT nextval('public.campaign_transact_id_seq'::regclass);
 D   ALTER TABLE public.campaign_transacts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202            �           2604    65629    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    205            �           2604    65630 
   modules id    DEFAULT     h   ALTER TABLE ONLY public.modules ALTER COLUMN id SET DEFAULT nextval('public.modules_id_seq'::regclass);
 9   ALTER TABLE public.modules ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207            �           2604    65665    orders orderid    DEFAULT     p   ALTER TABLE ONLY public.orders ALTER COLUMN orderid SET DEFAULT nextval('public.orders_orderid_seq'::regclass);
 =   ALTER TABLE public.orders ALTER COLUMN orderid DROP DEFAULT;
       public          postgres    false    218    217    218            �           2604    65791    prod_category catid    DEFAULT     z   ALTER TABLE ONLY public.prod_category ALTER COLUMN catid SET DEFAULT nextval('public.prod_category_catid_seq'::regclass);
 B   ALTER TABLE public.prod_category ALTER COLUMN catid DROP DEFAULT;
       public          postgres    false    221    220    221            �           2604    65646    products productid    DEFAULT     x   ALTER TABLE ONLY public.products ALTER COLUMN productid SET DEFAULT nextval('public.products_productid_seq'::regclass);
 A   ALTER TABLE public.products ALTER COLUMN productid DROP DEFAULT;
       public          postgres    false    215    216    216            �           2604    65631    roles id    DEFAULT     d   ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
 7   ALTER TABLE public.roles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210            �           2604    82192    stock_update_history updateid    DEFAULT     �   ALTER TABLE ONLY public.stock_update_history ALTER COLUMN updateid SET DEFAULT nextval('public.stock_update_history_updateid_seq'::regclass);
 L   ALTER TABLE public.stock_update_history ALTER COLUMN updateid DROP DEFAULT;
       public          postgres    false    223    224    224            �           2604    65632    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            B          0    82198    awblists 
   TABLE DATA                 public          postgres    false    226    ^       (          0    65544    branches 
   TABLE DATA                 public          postgres    false    200   ^       *          0    65552    campaign_transacts 
   TABLE DATA                 public          postgres    false    202   �^       ,          0    65560 	   campaigns 
   TABLE DATA                 public          postgres    false    204    �       -          0    65567 	   customers 
   TABLE DATA                 public          postgres    false    205   ē       /          0    65572    modules 
   TABLE DATA                 public          postgres    false    207   |�       ;          0    65670    order_details 
   TABLE DATA                 public          postgres    false    219   ��       :          0    65662    orders 
   TABLE DATA                 public          postgres    false    218   �       =          0    65788    prod_category 
   TABLE DATA                 public          postgres    false    221   �       8          0    65643    products 
   TABLE DATA                 public          postgres    false    216   ��       1          0    65580    role_modules 
   TABLE DATA                 public          postgres    false    209   �       2          0    65590    roles 
   TABLE DATA                 public          postgres    false    210   �       >          0    73989    stashes 
   TABLE DATA                 public          postgres    false    222   ��       @          0    82189    stock_update_history 
   TABLE DATA                 public          postgres    false    224   ,�       4          0    65598    tasks 
   TABLE DATA                 public          postgres    false    212   F�       6          0    65606    users 
   TABLE DATA                 public          postgres    false    214   ��       T           0    0    awblists_awbid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.awblists_awbid_seq', 1, false);
          public          postgres    false    225            U           0    0    branches_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.branches_id_seq', 1, true);
          public          postgres    false    201            V           0    0    campaign_transact_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.campaign_transact_id_seq', 236, true);
          public          postgres    false    203            W           0    0    customers_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.customers_id_seq', 4, true);
          public          postgres    false    206            X           0    0    modules_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.modules_id_seq', 1, false);
          public          postgres    false    208            Y           0    0    orders_orderid_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.orders_orderid_seq', 23, true);
          public          postgres    false    217            Z           0    0    prod_category_catid_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.prod_category_catid_seq', 1, false);
          public          postgres    false    220            [           0    0    products_productid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.products_productid_seq', 5, true);
          public          postgres    false    215            \           0    0    roles_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.roles_id_seq', 3, true);
          public          postgres    false    211            ]           0    0 !   stock_update_history_updateid_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public.stock_update_history_updateid_seq', 1, false);
          public          postgres    false    223            ^           0    0    tasks_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.tasks_id_seq', 26, true);
          public          postgres    false    213            �           2606    82206    awblists awblists_un 
   CONSTRAINT     Y   ALTER TABLE ONLY public.awblists
    ADD CONSTRAINT awblists_un UNIQUE (awbno, orderid);
 >   ALTER TABLE ONLY public.awblists DROP CONSTRAINT awblists_un;
       public            postgres    false    226    226            �           2606    65806    customers customers_un 
   CONSTRAINT     U   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_un UNIQUE (username);
 @   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_un;
       public            postgres    false    205            �           2606    65804    prod_category prod_category_un 
   CONSTRAINT     ]   ALTER TABLE ONLY public.prod_category
    ADD CONSTRAINT prod_category_un UNIQUE (cat_name);
 H   ALTER TABLE ONLY public.prod_category DROP CONSTRAINT prod_category_un;
       public            postgres    false    221            �           2606    65802    products products_un 
   CONSTRAINT     W   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_un UNIQUE (product_code);
 >   ALTER TABLE ONLY public.products DROP CONSTRAINT products_un;
       public            postgres    false    216            �           2606    65800    users users_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (username);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            B   
   x���          (   c   x���v
Q���W((M��L�K*J�K�H-V��L�QH.-.��M-�q R�y����
a�>���
�:
@��_R����XT��Z\��i��9d�� ��X�      *      x��]�����)�.3�I� I��\mmr��L��3��)���~��Kw�?�J�� ���S�]9�RG3�9�A��������|�����O����|��a�z����?��|�ˇ��ӿ�Gx:����m�������O��q7^������4��s4^����q�w�_�o�C��;�n����_��������?�������x�_f��|�����H�A�W����o�B���?�y7@`�?TZ|����o���_��w`�lөM����k�n؆��h��6�-��b�M�{>���zʙ� �Ǜ�@��DbFvmF�S�8�BF$������0�_�hPZ�VA�����!�g�v��q�w�aHR�kW����IZ@�9�z5@3@����Ø���	l��|���^�4If@=�V
`���������_���T�H�{!4�+�8���ؼMV5���a`�.�M��p8��D�1�䇅�s�$�1^�n-s�X6d�Y[7�7�٧L�F}W�?d���D�:��k�|]���ȟ5#��th~���&ߎ���������}��X}���s�g���]Ȗ0\�d��MB�ol�����n�a=3���OG`�ӕ[-�]��ٯػ��1Ak"[%�����=͏�4q�s� �����M����ni4M��M��^f�xw��@��
/�M"��dVe$.��C�x���1<�8�2��&��=K&S�5
��9�L(g�{D\��.	Zc���tK6�����K�K2��C���ζ�pm6	���{J��P��"�_���v���P�����T�2�V[�T���bu�����T��@���W�6^�;d*�D����A��t"�� 1�+E���o�*��E�����]�7����*/K�W,ƨ�2���|=}�"�b؅[à׉���]({�9Z������X9z���Ҟ���I���u�����K�&x�z���A�K9zq��l)4vB�"}u2K��Ջ���c��%)���%��P��i���]jڮ� �_:p��pY��2�\��Z?z/я�dd��n*������:b_�;�����
MG �w�z������Qhf�����|��L�3yŹg��Xt�^~��ä@�����aY? k9XL ����e�m>�b����<^m��(}㘓=�"o�/ ��~/����N����s��K�+x$�����.�Rw�ꎝ!�E��p�zv���T"�'�9wZ5����W�DO�s,��
gR��ꝍ�.3�FȢY��T �	���b�0B\d4�B�h�j�~�[R��,�2���t�򣑋��=1;"+�J,cGtY��؃�O
��7.n�B(��'�U���^_J�mV�q�c�[�:K��5�"�$eWY|�`ǭ�Ȥ���|�����v�P���]2&��)�1��|�D�2��Xt,�^�+�i�d
��}�L�Ъ����ӿ�LA+�ѭ���N0�'B�$"�!���n�h�#��#�8���_�@�7��+o�S  �
v��xtX��u��2�@x�u%����nT>��z��X�G�w����*����.?1�3Z��B� �[h�7�.h,}�~�HU�U
�����������E2�Jeu���P�2!���GU�y=��y���~���`�B�*�c��sbv�"Ӑ"����k4�رެ���7i0}�M���z#/��^
�
����/����	Uu}|���f�'xLn	��H|-�B�X�i�nM����\-��F��ZuȀG��$BK����R�(_��z����Ԝ۸G i���}$$�k�#����~.��ջ&��$�=đ�
�����ۧ\��8��K�S�ކ(t혐�����,��n�nE<`᳔NX�e���P,&���c,*�����IKoX�^|	�bB�厱@ ����4���e�B�VL9Or�TL�j�>�$��:��^"S�#2mg
���:Sd��Nљj֧�s���t�`x���7����Ga����]Q����1boH��*K2�I�%7�
��&��Z����7���*-f;md��V��~,�nC��Pm���)�!fƶ>c�6j���N�ء����&�=y�n��'B��o�����8�d��&�
X���Ⱥn�Eގ�%Y��s��G����~i�H�!�	�Utpخ�^	�@r55��%��{M���kQ���ݔ"t����߅�����ە)����`��Dj�4��n�,���s���b�4��\Zc�M�&��A(�^��X��W,H�/y"���y�*��ҲQ��֗Q������*��?�?�SF�C��+��o3�`�0]�P�ս��i����4t��}�o4T�#)e�%���H��n)4mIၤ��=�4�I�`D)Ά��b���"
�X�~$�ee��Cmy~A����hZG�υV����ϻ�(�������.߄�P�B�r]���c�ޜ���
�`��*1.�}��y"����a��T�_�u؆��gȒ0��㎴�O���~^^��RXS�ֽ^M��p+�aP��r�H�zC�ѫ�f*L5��j,p�_�<�`9.?V�О'��{y]{bDa�ĘQ��;J�/�{芅�Y�c��3:��������6�j������B�XX�5O�C�F����S�HRG����	� CW,½Tڰ����t�%��F��h%��x�M�i-oHt�O�Q�'������|�h�oE%@J5?�{�h��Kb���*�R[d�v����:;4MX �ʜ~�P]��v3
$e��K|�Ǳ×�3���)�N�F�k䌔�S�0R�Y,� �w�$��.���I�^I��b�l�������6애ر��'"�(�a���k8
s0hU�Da;c�k��5�S�����>�̯�P��
2ݐ5�U�0O�"K�R�\�)�c?Xh��f��H���AA."��e���#V�/��:�%����	U4 r���K�z�-��t8�e־.�w;<��� B��*�<��K�}�:��Y&�$v�D��#���P���3�'�=�P�GPUY��f4�����/sy��G�g�`n7B�"����X� �X�$��%Z"���	%�'�S@'5ĥv���Q8����dB�V^�K�~^5X;05��*[	I��9|Gо��"���|����HH� R�%�r�K�
�"��u"��Wh�n<�-��ئw���r��/��� f���
YĒ[�WLՒ�uX<O��#��w'.�b�B��4��@�5���_���JZ�̳T0|����S�tz6�Ͼ�Ǡ��5/�[Ӓ�9�@�Y�EC�㐿c@3�ȅ��#�.Lޞ��$�y���w ,l�mmjδT���O5ߚEmN��s.u��S������,�t�Dw��Zq�}������<^1�D|}cUl7�$%���yRbi<����gsm�e��n������0�z��k����U{/r�M4�4!�:cPl��<1ol=���Ɩ~��sQ$��(�cX��P�w�Om����ez{.tXa>�jA��m8���/��D�1�<8%�7w�w�-*@���/���%��7B�?As�uý�+���j�$0�_M�n��c�i��9�t5���<�.Xjs���B�T r=do�c����Z6����u�1Ԥ/,ӽ��7��Ao�W ����1:��ƌ�r�0MJ������:$�HCbD�S>O��*����cB��,?��/��_��gBYH��H�����K$������/a����s ����d�K$��k�qS}�Z_��C�x���J$��#�K$�Lm����%�hJ�� ��gh��I=�wK�����,�&߃2�N��ڼ*OGZ �z��UC�:����������O�6������4 �*�;"���j��Pj�x��v�tbQS�����O*��a6�����r!L�G�(��}��$q٦��/&�m38��m�g[�w��6�h�ə���u�����ڌz���HԵ���Quh�^&K�k�����!�gHd=(���}M�˶Z��     4�
 ��������  ^�4IFۥ�&�B��_��N,Hθy���l�i[��6`�]��r����"E�,_��.4h��ף:�Ʋ!��#u�A}#�I��_��u��+d���D�:��V4ծ(�`g�s��(�͞7�v<}��o6��������w��>�Ik���p����6	���e>�߷v������k3�>�	�m���u�`[A¶b��8Mcy������סP=aY!���� ���A��d	��������
�P���n�by %H' ���1<�#_���J�Y2��m_rt�P ���co�#�#[��vُ��2�k�1x>Ĝ�O�lKp�f`�Q���W~O�����9�]�?������*�%�o����Y��ʤ.@%�{��>
�@�H���
���#t�,@%�财�(��:����A_)�m9e�7q�t�"����0?ȸ�������{�b�Z+S�;��S��w0�b؅[à׉���2h�`�#GKVպ�;z���Ҟ���I���u�����K�&x�z���A�K9zq��l)4v��?�f��T$ ������ME���M�߇�R�v�yM��ҁKm&��u'u&"���\=�Z�����T��= ۰ﲎ��y����
MG �w��@/��XhfbgG��	hn�蹕��k(�=�Ţ��pU/�9L
$��Z��Rh	TÙ|X�<�7,�l�)�k�j�:���9U�V�?jU�e�h7/vzU�_\�d۽Ը�Gj/Ғ݁^k�;�Ky"��-�У�[υ�9 �y"��ණ���*��ቄ�@d�3�y�K|>�W�6��f��g�]&zk�.�m����C����j���������d9Y�e&%�频����H�S�~ׄ�]�+�JRƊ���[e�IQKV�v�<_�����p�L�������3S>c���L�.ve�w��X��.WӾ�=��d�5�J��}(�9�V"��B"	͝`<O�ID)|�����G�}��r�7Vmd1�0r�@�Q�N� �;*(�g��a9���_�DlZW�i<$�F�C�A��X����xs�o�Ek4�d�Z-"���x�Z�Fc���D��RW��ίD�[C<ϋ�?gՁ��z���
��~��`�B�*��c��sbv��׹�=ڡP�FB�֛M�[D�c�=��{�	'�F�h�/:&8����?�^�gc��ZI}��4O$���=�-�B�X�)�nM���%7-��F��ZuȀG�NЎ-�^�K%�|q$�y�{d]-����=I�G�#�I8�|���x�ϥY��'�u�#7Z�ս�Oa��q:IL����Q��1!��s��ӻW$Aը߇��R:a��=nd&B���~펱p�%�y{��'-�a1�1D�-w�����(���8�斩�Z��d<ɅR1�����4)���#x�I�ǎ�4�)0vD'�L��":%d�Y��N�Χ��?�iTJEۃܤCh��!�7��wEaH�R;��`�U�!���,��f�����&xS��njI��V��Z������yS[]���x�´�B5����ƅ�������5:��c�Bki3��/����-�
}�O�bq!,ޖ0�Cq����M&����uG���K��綒�����}� ���C�'�K�خ�^	�@r5݄�%��{M����P���ݔ"t��X�߅���������>N��Djg+��n�,������b�4��\Zc��i&��A(�^��X��W,H�/y"���yj�*��ҲQ��֗Q������*��?�?�SF�C��+��o3�`�0]�P�ս��i����4t���|�o4��#)e�%�����n)4mIၤ��=�4���`D)Ά��b���"
�X�~$��`��Cmy~A����hZG�υV����ϻ�(�����1�.߄�P�B�r]���c�ޜ���
�`��*1.�}��y"����a��T�_�uB���gȒ0��㎴�O�S�~^^��RXS�ֽ^M��p+�aP��r�H�zC�ѫ�f*L5*�j,p��_�<�`9.?V�О'��{y]{bDa�ĘQ��;J�/�{芅�Y�c��3�.�������6�j������B�XX�5O�C�F����S�HRG����	� CW,½Tڰ����t�%��F��h%��x�M�i-oHt�O�Q�'������|�h�oE%@J5?�{�h��K6���*�R[d�v����:�1MX �ʜ~�P]��v3
$e��K|�Ǳ×�3���)�N�F�k䌔�S�0R�Y,� �w�$��.���I�^I��b�l�����sa�6애���'"�(�a���k8
s0hU�Da;�k��5�S�����>�̯�P��
2ݐ5�U�0O�"K�R�\�)�c?Xh��f��H���AA."��e���#V�/��:�%����	U4 r���K�z�-��t8�e־.�w;t��� B��*�<��K�}�:��Y&��u�D��#���P���3�'�=�P�GPUY��f4�����/sy��G�g�`n7B�"��o�X� �X�$��%Z"���	%�'�S@'5ĥv���Q8����dB�V^�K�~^5X;05��*[	I��9|Gо��"���|����HH� R�%�r�K�
�"��u"��Wh�n<�-��ئw���r��/��� f���
YĒ[�WLՒ�uX<O��#��w'.�b�B��4��@�5���_���JZ�̳T0|����S�tz6�Ͼ�Ǡ��5/�[Ӓ�9�@�Y�EC�㐿c@3�ȅ��#�.Lޞ��$�y���w ,l�mmjδT���O5ߚEmN��s.u��S������,�t�Dw��Zq�}������<^1�D|}cUl7�$%���yRbi<����gsm�e��n������0�z��k����U{/r�M4�4!�:cPl��<1ol=���Ɩ~��sQ$��(�cX��P�w�Om����ez{.tXa>�jA��m8���/��D�1�<8%�7w�w�-*@���/���%��7B�?As�uý�+���j�$0�_M�n��c�i��9�t5���<�.Xjs���B�T r=do�c����Z6����u�1Ԥ/,ӽ��7��Ao�W ����1:��ƌ�r�0MJ������:$�HCbD>��D���]����QϤI��H���D��%�x|�Sҗ��؉Ё3�z|䎉xv��%�xe�옦�z�/��H���{%�z��%�x��z��G4%�c�J�3��~���
��%�x~|tg~��!�~'mTm^�u#-���ƪ�F�E@����Bh�P�'A�k׿EP�tA��A��h�J�|(��:���F:���I�Be�'���0��JEi�bL�
&��-@�m��B\��m��o�4F`�����b��6Z]r�E����7�v0����ڌz���HԵ�~�Qu6�^�Jah�����!�gHd����}M�ʶ(�� 4��E��J]K��"���M��6��ɻ�7�􊆯?q'$gܼM��)Ĵ\�J?0���}���p|��"c���y�����	��bِ��x:Ѡ��Ϥ��h��4�2��g"s��s�jWPD�3¹dh��fϛ|;
����7X�ו}��;�}��?ˤ59�f����u��~��2���[;���zf�t����6�f�:b����`[G`���<�������짞����mre��wK���h��nr�f�v��xw��@�4�e�I��<���
c�R��瑿/�Aj��,���/9�L(�V��7���-�b���`[Qʵԋ�<bN��'u�%��k3�܈���+��d�UY5����Q��C�ڷZRq��,[meR���=��^�� Q	$}m}��`���A�JtZQI�eӉ��Ġ��N���J:zzk��t� \c�[�N{YX��b1F���ݝ��Љ5�^��­a����F�@�W0���%�j]��U�䊅?iς�Nޤfg�:`�bg�%B�<~ Y  �J@͠����t�;ة�	w��h��W�8���fP@ц����w�i�b��&a���6�i���:K��eg.��P-��v.�n*���mtwYG��6m���\~M��# �;ԉK�RK,43�����47������5瞁�b��[����&HM���a)���F>,|��y����5j�N�[|ǜ�X+�W�*ֲ���;�*�/.H��^j\q�#	��hI��@����ȥ<�P˅�D�Qح�B���<�Pap�UCo��~�J��DBz ��<�%>�yjFh�����=�5P�6��	O��&�P5���j�~�[R��,�2���t�򣑋��=1;"+�J,cGtY������&��]�Z���,>e��VYd��҆U��?���|�i(��
�.YϔϘ�y>S��]�],� �i���Ŵo���t�e���{y
m�������ցHBs'��D��F�_~}�D��a�]��ꯍL �F��7��)�s���l<:,ǿ2�̕h�M4���ݨ|�5H�4˱��07��fs�FC�s֫�Т~ {�w>Gk4�>�O�*�*�w�n��j��8��ܻ,�sV!Q�G���1��q6�	(T�m8��?'fW,|�D۳�#�h$T�b���Et9���s���p�kt�6���f�sx���y�{�񑏯���L�D��-�Г��b)�����v�dȻHP��Ihdݬ�P'�x$�i�В��q�T"�G� �G��Rj�m�#�4}��>�L��Gh���\��9�Hp�Y�8rpC��RP��?����z�����R��1�c�{�T�|X�,�z��Ff"�	�	�7��Q��ѽ',|���CY�`1��r�X��*͍�`an��P�!NƓ\(���O*Ic��eJz\��Ty�L�cGtr�+�SB�����D���|*.�#�F�Z�=�M�1���Q�xCjyW�d�!��i�X�R������mn{�M|mz�7��首$ko�M-��J��N�7��e���KOk,TӺ>~
m$���v�X�MzZc�#�>v(��9c{*�	~O�B�l�P,.��ۢ�}h!�2Y�ɤ��#�n�`���vI�!����Q���D>�y��dB}��ە�+acH���p��\|���q �>'�~���R������P�2 ��t���5�Wk��H�4���풅��B{՛�X,���v�Kk,�Y��0;ł�+�����%O���!;O�TŶSZ6*2��2JR����P�O�����r�(�`(��z����m&L��x *��70t!-2�]���N�ր�oY�Fdu$�,�D���B��-��-)<�4����&�(��uVl��[D��ۏ��z̲p�-�/hu�M�H���
� ��y�e՛�й2����_HZ��[�xݛ7uR�@�uZ%ƥ�q��Q:O�^�R�"LZ������԰��Y��{ܑ��)u
��ˋ�_
k�ݺ���i�}n�:*s�a�RNI^o`�1zu�L���FU�N4���',g��������X}/�kO��#,�3*5}uG��Eu]�0�!rl~�B�`uqVc����X��WBY��¹���r�~�I��^�9�d��E��J4_��οd� ������!�I>���N�i=j��$�5qt�����Hi���g{�Ԕc� ��߾�SeYj�,^��V_�Bgn�	�^����|�n�B���z�O�8v�R�cfRp8�� �)��(|����y*Fj=��Wt���مЖ>�c��+��_,��x!�?2vN/��&��;����D��9�T\vGa͡�(�ag�r�c��z��bӹrݧ��U
2}CA����*�|�iRc�]ʐ�=�\`��R�,��X�>(�E���Lsz�*�E���W���B�6;��@��r�RO��V��B����%�n�V�aD(_e�g�t����T�?�$b}��>|�Y}��[|�����
���*Q��f��X�e.�������F(T�������|��BKdP� ���$z
�!आ��0����u��LhҊ��p��ϫk�&Ze+�` i<>��ڗ>X��ߟ�s��R| ��@걄W��c�W��C$�NĖ��
��̀�<���C�����]�0����B_!�Xrk!���Zr������o����%TL�C����B5����#��{XI�y�
�/�#w��b��Cφ�ٗ��T|��%�x�cZr�5 �H=3+�h�r�w��af��[|��e�I�۳}7�d�2�R�����Z`��M������^���[����[Υ.}�8:_2�%�.��.|4B+������P��+F������q������x6OJ,�g�Q�l�-�L�ح�3�c�p7�u�B��_z-T��Uøj�En��@����&�Vg��}�'�큭:�����w.�$YEu˕��N����q�Loυ+�GBW-(�þG���e:�=��b���D��.�.�E(����]|��{��F��'h��n��|%0�]M����	؍�{7͔>�R��溂ޘ��Km���]�
@���y�X�^�&B� ���7���e�����0<�-�
��3&B�w@ҘqtC�ݡ�I	��a��y\�$}i�@̃H�G�?:���9�T"�~�q��z�D��x�B��;:pR���1��{�D�,���W��}���W�z�DRO>r�Dϴ�Z��^∦D�aR�x��/��Sq�DϏ����/��=��懶�ͫ�n��C��w�X5Ҩ��z`�{Ym��$�a���ʘ�N"��#"�1��Vi���]G�\�`�H'55�ᙑe��w�H��      ,   �	  x��]��6���+ԫ�3�F�mz��ݶ���یl����>��ˀ�5���ٱ�,ã��s�������)��q���fko~5g�-�~�^�/��k4]��/�ǧׁ���6�Ndođ��_|�q�cl��8ظ���,d�|%_n�(bK�4����n���E_��G�x����z�Q�٭���c��k��EQ0_q���6��#��l��x��f�8d">ݣ�$[�᎟�!��a�_��V���$���>~��}���u�~�Ëz &퀩��kL�c�*`R8�B�1���_�Q�l�#l
�V�u���q��䏕Q�ׁ��Y.� t�_�Y�Ȍ��Ak䘴�h6v	:��v/A�6�D/��}b��t�X�py33o�
�n�� ��%Ql��l>�f��(����I�Na�֘h��5,���A5�8J�1~�-��)K��f�2�CGm��fǘ���X����R�+����X[�Cƙ���9���ٽ���ɸ��;�<j�\ �#��s��*�rUe��H���|������(�Y���y4w���������ʰ������e2����9X^�7���� k��'6������-j��x�6j�j��u���5r}ϗ\%ᖐW^=O�*�Pe|�S�B�]�2��z�:{L+,�����Z���C�bP�'���#҇��alNo�d���Xq��A��D�Vr�<,���y)$iɉ�M�h^��ff�7��,��.�p��1T����]����2e�ҕe���	�jFi�2����MT�>1�$�Pns���(O�(W���E��{#C��3ϏY<�������p56e�1����%ƯA�r=WR���By�~=}��s�Vi��+6n�}���b�j&�u4��2���+ozo�o��sἫ~e"���ĭ��h7W�U3�;q��ga��e�wF�C,U�ב�}���:c��4��[T� P�� ���Fz�ia�5"/�{3/�-��X�d����0N�>��g�"̾r�M.H���[QKyr(=;���`���|����5)�ܰ��q1��>nn�Q�������S����J�e�;�&��y z��-m�iR���N�U���e��`�#���I���p5en�v��/ٌ��c^��{w�
]�#q?kr���2O�����Bľ�0���
yײBJ�4sƲ0J
�{}
���I�����5B�y��3��I����i���~�b̂@�2U␉6Mb�펵���5�F{�_��Mk:�t�M�͓��[Җe��Ry��t_<���H?�M7��u�u0�,�p��w�?g!+[4!Y<kf�-���K�P}��*���zFt��P���v�S	��pX˟�.M���t��#��Y������y���Ym�=�1��_�Y�����w��ƅ�����I���u��_v���K֭첞7My�<��#����2���:@[������5Rg�]-�iN��a���2��f�[�~Mǡ�`A�>����l��tiiSږD�$69��i�8�<B'��ι���h���N�۱�����w����L�Z�(�u3m+;(Ӯ��jh'� ��6��bK�>eڂ��o�[=2�°�|�B6������U��=�<��0V����]��8y~R�x:���v���ȗ.�צ�\��[�%�l{�"���c���A�h�����U�`n�G9'�En�f,ܡ�O�5'}5=��*۾�'�oU��R/QF�b��	h�[yÐ��������I�^n��}ug���C��/�����;�3۲�����q�w73����l���-�������=Z,ѝ�i�2~�y��/�;������١��]x�j�uC/X��X�����������??a|�Vq����o���Z?�5���Ƹ�n����j�DH�2��R9]B6��a:�(�B�2� 9�~ ��a�3��S� �rX��9�� �rXCGrXCdrXG'rX �u&HA���A�N��䰎�@䰆H䰞�$�aw�9�P9�#�9�A�8�a����&rX�crX'�5rXg9v �5� ��?s���9�a�9�a����@kȴA�O� �5P� �rX�$rXàrX}?3rX��9���9,��:W� ��3p�ú 9,�]=�1�����������@�0v�?�c��c�?vΐ��A��菝'�l>���-��5��0菁�ؙ ���3�1�;��:�;�K �1�"I�{.��?v�U
��N@�ǎH��a�?�/o��8菝�=菝`�菝�؁��`Ѓ�X��A��?6|�?v8s�$^���!���>i���@I����4��:����,�����N���@�\I���a�:�3�:���:S_f�L��T���3�x�/��*�      -   �   x�����0Ew��m��1ܜH���y�4�Ŵ֠_�İ89�r�{�pN�ɱ�4/�pq� �U��uTd,�RpX�Y�"�PPC�rp���p��*)�9��أR( ���@F�F�!��lI���^��q��,�z��}��}&C���'�͋ �m����u�d�{�=��      /   
   x���          ;   b  x���Mk�0��"7[HG�$���v�A�ݮũ0�a��a�~汩��S�@�KO?�W�l��<�Y��?��魩���+��PV}^7_l�ۺ����?vmy*z���;.�C���5gm�7K�����ٱE(E��0��yg ��,�Q�ô�2?,#
�0���4zd���0 g��8���B��b*�g�.'c"�w���J���B�>SZ�\ʩ�G�L��kK�0�WK)�W��g��+��U!,���Ȟ��,FX���VM�F)�+��3AYB��th�j:0J1S��cZ�[���=i�[S�ii�bZ���AL�y�)�oڀ	A҃aB8�GW�q���<�t�o^� ����      :   �  x���Ao�0 �{Ż�J	؉	�9Q���(�F�i����4q"'����9�VJ��m�Q �8�|<�~0�ή>��xz���!��n���%���%w`]PI\�B+̄�P�iAε(�M�c��e����\-��خa%ss�� U^aZ�EsR�E��o¼�s!�*�Yr�G����R:ߵXH%:�x�v�Cw_�f5G]�0́z!�
�
.P7�YW<�13��63�2��X�\�Rb3��B]�w=
48g�Ӽ��4ӛ�O&���WMg���x���LH��h��Ϭ�v�m7V0Z"\�im��`�[�C��v����Z�C؆���}�n��7�\#���c��bk�z-�l�e;���'X�?����.	���R���+l{���+˶[;��l{���+˶[;��l{�Ļ�\aR�$Z�]��f5U�*	\�2�.��U�Q�D$������_��0 ���e�t�'[�h����>io3CWf��<o�>���k�#tH<�_F����,�Αq79�������U�D�~�h���P!4�O� ,� ^?Fw���2g3��{>e���8�}�b�#�|F}��;	]�?b�!�U�C!����yX�4��k,�_!��n��"o]�u�MD3������tK�(W�n��Nzg[�s���G�u͞��"��f�Ϣk�R�9
6�m�]n�nF���p������'bc�      =   
   x���          8   �  x��Ao�0������JI���� �U��ޢ��C�D��߯�V�����"�e�7�ff�j���Y��e��${(u�kf*�k��4Ra.<ؠa[�h߼�dR(�N�r#]��Ze��l����*2�,�m�A�BV�拡I\<Ӳ4�Y��̃JdY�%���<Mj��ïh�<]����*&8�,a-�Ҷ��N4�N!ϥr" �Iߧ�p�##:���y���4��x`t-�����u>fJچpk��j��cO�v�RT�(�7(����U
9Vhm�CBl�;�%���5�?�ӵ�&[��
&�y���e��'��6���P!41cy��3��W�ܳVv�LcԵ�R̑��������F��?�k4vѣs[�;ܴ�L_ w��gߧI�Bs�b)����Oz@�����K>����j����^@4%�n�	!�[�D����4W��}�c*:4����aw�(�����%ؕiێ���,6�      1   
   x���          2   n   x���v
Q���W((M��L�+��I-V��L�Q 1��sS5�}B]�4uԋKR�J�S��5��<I5�h�O~II��cJnfYf#�(.�OV0$˔Q���/\\ ƿ��      >   �   x���v
Q���W((M��L�+.I,�H-V�(-N-�K�M�Q((�O)M.�L�3��S���@���RS!��'�5XAC=1�4/=7?#7E]GA�D$��)#cMk.OX����V�ihd�L8��9�Y�`��6sq ��J�      @   
   x���          4   a  x�헱n�0�w?�$�c�GR��)h3uݢI��%8Bm9��oߣl�y�Je��00�����b�p��Q,V�����yWmfm��n�uUL�&߿�ն�ߛ�KYwe�>�SQ�y;U�nʺ���O��ZM�U[6� ;�j�
 A�JuV(�t�ʉP�3�I���ϱ��4Y�g0��ʓ���w��N[ft0��R�X�(	8�|��p�����Xo/�#3�I��vC��M�;SK�Y��=:]B�C2~�&��N7��!�u��ӥu+?�.���`��f/3�:.��^r��(<�iT<�8t9"U����ՐN�D92�%�������XI}+\�&ʑ�A!�=ZG��1�0����|5|&)��\���/���Y=-����Ä�'�-z��l���\͇`�jb62�%��-�R�92����t �����[8÷�����*G�S$ �'�(G�O��o?Vf�|o|�a;*@��$P2:��	LH��D���k�=����Y�FJz�t��M��X'D9r4��������������������������������������������������������������O&� ����      6   �  x�ՓMo�0���
�h�@��C�=e%ReAS�
���1b�NRh}	Z���e����kό���Mf��y�p��&މd�T�+t�.2*�@eTU{�Si���h�jHW��{����2����O��V�8�u$���j%�x�k�������UM	�m�3P�K�.�]�\��pn�f���}���]��㗑Ӱ���qg�_��r��]�OZ9�P��QLI�#�mFm�sj�v���,�n��[����4���x ���O�[�w�Hh=(�F�.�%���9<뛀8I�sɆ��6��ҾC�FT5\�}b!r���u�'s�?����z����ż��<kD>nS���+�
��O���2���&��`2�?	f3��_S�B��1��!�c�0���&|@����c�D���&rC     