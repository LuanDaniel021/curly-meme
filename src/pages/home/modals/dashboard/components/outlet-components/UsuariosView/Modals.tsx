
import styles from '../../../css/Usuarios.module.css'

import { type FormEvent } from 'react';

export interface Usuario {
  id: number | string;
  nome: string;
  email: string;
  role: string;
  status?: string;
  dataCriacao: string;
  iniciais: string;
}

export interface NovoUsuarioForm {
  nome: string;
  email: string;
  role: string;
}

export function ModalCriar({
  novoUsuario,
  setNovoUsuario,
  onClose,
  onSubmit,
}: {
  novoUsuario: NovoUsuarioForm;
  setNovoUsuario: React.Dispatch<React.SetStateAction<NovoUsuarioForm>>;
  onClose: () => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <h3 className={styles['modal-title']}>Criar Novo Usuário</h3>
        <form onSubmit={onSubmit}>
          <div className={styles['form-group']}>
            <label className={styles['label']}>Nome completo:</label>
            <input
              type="text"
              required
              className={styles['modal-input']}
              value={novoUsuario.nome}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, nome: e.target.value })}
              placeholder="Ex: João Silva"
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles['label']}>E-mail:</label>
            <input
              type="email"
              required
              className={styles['modal-input']}
              value={novoUsuario.email}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, email: e.target.value })}
              placeholder="exemplo@email.com"
            />
          </div>

          <div className={styles['form-group']}>
            <label className={styles['label']}>Cargo / Permissão:</label>
            <select
              className={styles['modal-select']}
              value={novoUsuario.role}
              onChange={(e) => setNovoUsuario({ ...novoUsuario, role: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <div className={styles['modal-actions']}>
            <button type="button" className={styles['btn-cancel']} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles['btn-confirm']}>
              Criar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ModalEditar({
  usuario,
  novoRole,
  setNovoRole,
  onClose,
  onSave,
}: {
  usuario: Usuario;
  novoRole: string;
  setNovoRole: (val: string) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <h3 className={styles['modal-title']}>Editar Regra do Usuário</h3>
        <div className={styles['user-summary']}>
          <span className={styles['summary-name']}>{usuario.nome}</span>
          <span className={styles['summary-email']}>{usuario.email}</span>
        </div>

        <div className={styles['form-group']}>
          <label htmlFor="role-select" className={styles['label']}>
            Selecione a nova regra / permissão:
          </label>
          <select
            id="role-select"
            className={styles['modal-select']}
            value={novoRole}
            onChange={(e) => setNovoRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        <div className={styles['modal-actions']}>
          <button className={styles['btn-cancel']} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles['btn-confirm']} onClick={onSave}>
            Salvar Regra
          </button>
        </div>
      </div>
    </div>
  );
}

export function ModalExcluir({
  usuario,
  onClose,
  onConfirm,
}: {
  usuario: Usuario;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal']}>
        <h3 className={styles['modal-title']}>Excluir Usuário</h3>
        <p className={styles['modal-text']}>
          Tem certeza que deseja excluir o usuário <strong>{usuario.nome}</strong>? Esta ação não pode
          ser desfeita.
        </p>
        <div className={styles['modal-actions']}>
          <button className={styles['btn-cancel']} onClick={onClose}>
            Cancelar
          </button>
          <button className={styles['btn-confirm-delete']} onClick={onConfirm}>
            Sim, Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
